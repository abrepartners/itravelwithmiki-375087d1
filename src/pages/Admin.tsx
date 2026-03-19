import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, LogOut, RotateCcw, Map, Image, Shield, Loader2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/contexts/AdminContext';
import { tripStore } from '@/stores/tripStore';
import { galleryStore } from '@/stores/galleryStore';
import { insuranceStore } from '@/stores/insuranceStore';
import TripForm from '@/components/admin/TripForm';
import TripList from '@/components/admin/TripList';
import GalleryManager from '@/components/admin/GalleryManager';
import InsuranceManager from '@/components/admin/InsuranceManager';
import ContentStudio from '@/components/admin/ContentStudio';
import type { Trip } from '@/types/trip';
import type { GalleryImage, InsuranceProvider } from '@/types/gallery';
import wordmarkLogo from '@/assets/logos/wordmark-logo.webp';

const Admin = () => {
  const { isAuthenticated, isAdmin, isLoading, displayName, logout } = useAdmin();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProvider[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [activeTab, setActiveTab] = useState('trips');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      navigate('/admin/login');
      return;
    }
    if (isAuthenticated && isAdmin) {
      refreshAll();
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  const refreshAll = () => {
    setTrips(tripStore.getTrips());
    setGalleryImages(galleryStore.getImages());
    setInsuranceProviders(insuranceStore.getProviders());
  };

  const refreshTrips = () => {
    setTrips(tripStore.getTrips());
  };

  const refreshGallery = () => {
    setGalleryImages(galleryStore.getImages());
  };

  const refreshInsurance = () => {
    setInsuranceProviders(insuranceStore.getProviders());
  };

  const handleAddTrip = (trip: Trip) => {
    tripStore.addTrip(trip);
    refreshTrips();
    setShowForm(false);
  };

  const handleUpdateTrip = (trip: Trip) => {
    tripStore.updateTrip(trip.id, trip);
    refreshTrips();
    setEditingTrip(null);
    setShowForm(false);
  };

  const handleDeleteTrip = (id: string) => {
    tripStore.deleteTrip(id);
    refreshTrips();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all trips to defaults? This cannot be undone.')) {
      tripStore.resetToDefaults();
      refreshTrips();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleEdit = (trip: Trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTrip(null);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <a href="/" className="shrink-0">
                <img src={wordmarkLogo} alt="iTravelWithMiki" className="h-8" />
              </a>
              <TabsList className="flex h-10 bg-muted">
                <TabsTrigger value="trips" className="gap-2 text-sm px-4">
                  <Map className="w-4 h-4" />
                  <span className="hidden sm:inline">Trips</span>
                </TabsTrigger>
                <TabsTrigger value="gallery" className="gap-2 text-sm px-4">
                  <Image className="w-4 h-4" />
                  <span className="hidden sm:inline">Gallery</span>
                </TabsTrigger>
                <TabsTrigger value="insurance" className="gap-2 text-sm px-4">
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Insurance</span>
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-3 shrink-0">
                {displayName && (
                  <span className="text-sm text-muted-foreground hidden md:inline">
                    {displayName}
                  </span>
                )}
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >

            {/* Trip Management Tab */}
            <TabsContent value="trips" className="space-y-6">
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 
                    className="text-heading-md font-semibold text-foreground"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Trip Management
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {trips.length} {trips.length === 1 ? 'trip' : 'trips'} total
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset to Defaults
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingTrip(null);
                      setShowForm(true);
                    }}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Trip
                  </Button>
                </div>
              </div>

              {/* Form or List */}
              {showForm ? (
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                  <h3 
                    className="text-heading-sm font-semibold text-foreground mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {editingTrip ? 'Edit Trip' : 'Add New Trip'}
                  </h3>
                  <TripForm
                    trip={editingTrip}
                    onSave={editingTrip ? handleUpdateTrip : handleAddTrip}
                    onCancel={handleCancel}
                  />
                </div>
              ) : (
                <div className="bg-card border border-border rounded-xl p-6">
                  <TripList
                    trips={trips}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTrip}
                  />
                </div>
              )}
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <div className="bg-card border border-border rounded-xl p-6">
                <GalleryManager images={galleryImages} onRefresh={refreshGallery} />
              </div>
            </TabsContent>

            {/* Insurance Tab */}
            <TabsContent value="insurance">
              <InsuranceManager providers={insuranceProviders} onRefresh={refreshInsurance} />
            </TabsContent>
          </motion.div>
        </div>
      </Tabs>
    </main>
  );
};

export default Admin;

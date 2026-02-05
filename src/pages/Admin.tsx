import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, LogOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { tripStore } from '@/stores/tripStore';
import TripForm from '@/components/admin/TripForm';
import TripList from '@/components/admin/TripList';
import type { Trip } from '@/types/trip';
import wordmarkLogo from '@/assets/logos/wordmark-logo.png';

const Admin = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    setTrips(tripStore.getTrips());
  }, [isAuthenticated, navigate]);

  const refreshTrips = () => {
    setTrips(tripStore.getTrips());
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

  const handleLogout = () => {
    logout();
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/">
                <img src={wordmarkLogo} alt="iTravelWithMiki" className="h-8" />
              </a>
              <span className="text-muted-foreground">|</span>
              <h1 className="font-semibold text-foreground">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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
        </motion.div>
      </div>
    </main>
  );
};

export default Admin;

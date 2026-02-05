import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Save, RotateCcw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { insuranceStore } from '@/stores/insuranceStore';
import type { InsuranceProvider } from '@/types/gallery';
import { useToast } from '@/hooks/use-toast';

interface InsuranceManagerProps {
  providers: InsuranceProvider[];
  onRefresh: () => void;
}

const InsuranceManager = ({ providers, onRefresh }: InsuranceManagerProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, InsuranceProvider>>({});

  useEffect(() => {
    const data: Record<string, InsuranceProvider> = {};
    providers.forEach((p) => {
      data[p.id] = { ...p };
    });
    setFormData(data);
  }, [providers]);

  const handleChange = (id: 'allianz' | 'diamond', field: keyof InsuranceProvider, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = (id: 'allianz' | 'diamond') => {
    if (formData[id]) {
      insuranceStore.updateProvider(id, formData[id]);
      onRefresh();
      toast({
        title: 'Saved!',
        description: `${formData[id].name} information updated.`,
      });
    }
  };

  const handleReset = () => {
    if (confirm('Reset insurance providers to defaults?')) {
      insuranceStore.resetToDefaults();
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 
            className="text-heading-md font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Insurance Documents
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage PDF links and descriptions for each insurance provider
          </p>
        </div>
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </Button>
      </div>

      {/* Provider Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(['allianz', 'diamond'] as const).map((id, index) => {
          const provider = formData[id];
          if (!provider) return null;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.subtitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${id}-name`}>Provider Name</Label>
                  <Input
                    id={`${id}-name`}
                    value={provider.name}
                    onChange={(e) => handleChange(id, 'name', e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-subtitle`}>Subtitle</Label>
                  <Input
                    id={`${id}-subtitle`}
                    value={provider.subtitle}
                    onChange={(e) => handleChange(id, 'subtitle', e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-description`}>Description</Label>
                  <Textarea
                    id={`${id}-description`}
                    value={provider.description}
                    onChange={(e) => handleChange(id, 'description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${id}-pdf`}>PDF URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`${id}-pdf`}
                      value={provider.pdfUrl}
                      onChange={(e) => handleChange(id, 'pdfUrl', e.target.value)}
                      placeholder="https://..."
                      className="h-11 flex-1"
                    />
                    {provider.pdfUrl && provider.pdfUrl !== '#' && (
                      <Button variant="outline" size="icon" asChild className="h-11 w-11">
                        <a href={provider.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave(id)} className="w-full gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default InsuranceManager;

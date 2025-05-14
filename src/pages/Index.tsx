
import { useState, useEffect } from 'react';
import { JourneyToolbar } from '@/components/journey/JourneyToolbar';
import { JourneyCanvas } from '@/components/journey/JourneyCanvas';
import { SimulationStatusBanner } from '@/components/journey/SimulationStatusBanner';
import { useSimulationStore } from '@/stores/simulationStore';
import { toast } from 'sonner';

const Index = () => {
  const { activeSimulation, completedSimulation, markNotificationAsRead } = useSimulationStore();
  
  // Watch for completed simulations and show notification
  useEffect(() => {
    if (completedSimulation) {
      toast.success('Simulation complete!', {
        description: 'View the results to see insights.',
        action: {
          label: 'View Results',
          onClick: () => {
            // The results button is now available in the toolbar
            markNotificationAsRead(completedSimulation.id);
          }
        }
      });
    }
  }, [completedSimulation, markNotificationAsRead]);

  return (
    <div className="flex flex-col h-full">
      <JourneyToolbar />
      <SimulationStatusBanner />
      <JourneyCanvas />
    </div>
  );
};

export default Index;

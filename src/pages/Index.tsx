
import { useState, useEffect } from 'react';
import { JourneyToolbar } from '@/components/journey/JourneyToolbar';
import { JourneyCanvas } from '@/components/journey/JourneyCanvas';
import { ResultsDrawer } from '@/components/simulation/ResultsDrawer';
import { useSimulationStore } from '@/stores/simulationStore';
import { toast } from 'sonner';

const Index = () => {
  const { activeSimulation, completedSimulation, setActiveSimulation, markNotificationAsRead } = useSimulationStore();
  const [isResultsDrawerOpen, setIsResultsDrawerOpen] = useState(false);
  
  // Watch for completed simulations and show notification
  useEffect(() => {
    if (completedSimulation) {
      toast.success('Simulation complete!', {
        description: 'View the results to see insights.',
        action: {
          label: 'View Results',
          onClick: () => {
            setIsResultsDrawerOpen(true);
            markNotificationAsRead(completedSimulation.id);
          }
        }
      });
    }
  }, [completedSimulation, markNotificationAsRead]);

  return (
    <div className="flex flex-col h-full">
      <JourneyToolbar />
      <JourneyCanvas />
      
      <ResultsDrawer 
        open={isResultsDrawerOpen} 
        onOpenChange={setIsResultsDrawerOpen}
        result={completedSimulation}
      />
    </div>
  );
};

export default Index;


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart, Loader } from 'lucide-react';
import { useSimulationStore } from '@/stores/simulationStore';
import { SimulateDrawer } from '../simulation/SimulateDrawer';

export const JourneyToolbar = () => {
  const { activeSimulation, startSimulation } = useSimulationStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const isSimulationRunning = activeSimulation?.status === 'running';
  
  const handleSimulate = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-800">Summer Campaign Journey</h2>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => {}}
          className="mr-2"
        >
          Save
        </Button>
        
        <Button
          variant="outline"
          onClick={() => {}}
          className="mr-2"
        >
          Publish
        </Button>
        
        <Button
          onClick={handleSimulate}
          disabled={isSimulationRunning}
          className="bg-epsilon-blue hover:bg-epsilon-blue/90"
        >
          {isSimulationRunning ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              <BarChart className="mr-2 h-4 w-4" />
              Simulate Journey
            </>
          )}
        </Button>
      </div>
      
      <SimulateDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </div>
  );
};

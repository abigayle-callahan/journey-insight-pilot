
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart, Loader, FileText } from 'lucide-react';
import { useSimulationStore } from '@/stores/simulationStore';
import { SimulateDrawer } from '../simulation/SimulateDrawer';
import { ResultsDrawer } from '../simulation/ResultsDrawer';

export const JourneyToolbar = () => {
  const { activeSimulation, completedSimulation, markNotificationAsRead } = useSimulationStore();
  const [isSimulateDrawerOpen, setIsSimulateDrawerOpen] = useState(false);
  const [isResultsDrawerOpen, setIsResultsDrawerOpen] = useState(false);
  
  const isSimulationRunning = activeSimulation?.status === 'running';
  
  const handleSimulate = () => {
    setIsSimulateDrawerOpen(true);
  };

  const handleViewResults = () => {
    setIsResultsDrawerOpen(true);
    if (completedSimulation) {
      markNotificationAsRead(completedSimulation.id);
    }
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
        
        {completedSimulation && (
          <Button
            variant="outline"
            onClick={handleViewResults}
            className="mr-2 text-epsilon-blue border-epsilon-blue hover:bg-epsilon-light-blue"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Simulation Results
          </Button>
        )}
        
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
        open={isSimulateDrawerOpen} 
        onOpenChange={setIsSimulateDrawerOpen} 
      />
      
      <ResultsDrawer 
        open={isResultsDrawerOpen} 
        onOpenChange={setIsResultsDrawerOpen}
        result={completedSimulation}
      />
    </div>
  );
};

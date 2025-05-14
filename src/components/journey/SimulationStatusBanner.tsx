
import { AlertCircle, Loader } from 'lucide-react';
import { useSimulationStore } from '@/stores/simulationStore';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const SimulationStatusBanner = () => {
  const { activeSimulation } = useSimulationStore();
  
  if (!activeSimulation) return null;
  
  return (
    <div className="flex justify-center mt-4">
      <Alert variant="default" className="inline-flex bg-epsilon-light-blue border-epsilon-blue w-auto mx-auto">
        <div className="flex items-center">
          {activeSimulation.status === 'running' ? (
            <Loader className="h-4 w-4 mr-2 animate-spin text-epsilon-blue" />
          ) : (
            <AlertCircle className="h-4 w-4 mr-2 text-epsilon-blue" />
          )}
          <AlertDescription>
            {activeSimulation.status === 'running' 
              ? 'Simulation in progress - Journey is in read-only mode.' 
              : 'Simulation complete - View results to see insights.'}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

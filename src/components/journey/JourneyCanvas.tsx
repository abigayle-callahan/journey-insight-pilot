
import React, { useState } from 'react';
import { useSimulationStore } from '@/stores/simulationStore';
import { SimulationStatusBanner } from './SimulationStatusBanner';
import { cn } from '@/lib/utils';
import { Users, FileText, Bell } from 'lucide-react';

export const JourneyCanvas = () => {
  const { activeSimulation } = useSimulationStore();
  const [isReadOnly, setIsReadOnly] = useState(false);
  
  // When a simulation is running, journey should be in read-only mode
  React.useEffect(() => {
    if (activeSimulation && activeSimulation.status === 'running') {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [activeSimulation]);

  return (
    <div className="flex flex-col h-full">
      {activeSimulation && activeSimulation.status === 'running' && (
        <SimulationStatusBanner />
      )}
      <div 
        className={cn(
          "flex-1 border border-dashed border-gray-300 rounded-md m-6 bg-white p-4 relative",
          isReadOnly && "bg-gray-50 pointer-events-none"
        )}
      >
        {/* Demo journey nodes */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-epsilon-blue/10 rounded-lg mb-4 flex items-center justify-center">
            <Users className="w-8 h-8 text-epsilon-blue" />
          </div>
          <div className="h-16 border-l-2 border-gray-300"></div>
          <div className="w-32 h-32 bg-epsilon-green/10 rounded-lg mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-epsilon-green" />
          </div>
          <div className="h-16 border-l-2 border-gray-300"></div>
          <div className="flex space-x-16">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-epsilon-amber/10 rounded-lg mb-4 flex items-center justify-center">
                <Bell className="w-8 h-8 text-epsilon-amber" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-epsilon-red/10 rounded-lg mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-epsilon-red" />
              </div>
            </div>
          </div>
        </div>
        
        {isReadOnly && (
          <div className="absolute inset-0 bg-gray-200/20 flex items-center justify-center">
            <div className="bg-white/90 p-4 rounded-md shadow-md">
              <p className="text-epsilon-blue font-medium">Journey is in read-only mode while simulation is running</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

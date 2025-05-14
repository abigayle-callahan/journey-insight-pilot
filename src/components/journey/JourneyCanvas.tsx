
import React, { useState } from 'react';
import { useSimulationStore } from '@/stores/simulationStore';
import { SimulationStatusBanner } from './SimulationStatusBanner';
import { cn } from '@/lib/utils';
import { Users, Mail, Clock, GitBranch, Bell, MessageSquare } from 'lucide-react';

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
        {/* Silver Tier Upgrade Journey - Linear Layout */}
        <div className="flex items-center justify-center h-full">
          <div className="flex space-x-4 items-center">
            {/* Entry Node - Audience */}
            <div className="w-52 p-3 bg-epsilon-blue/10 rounded-lg flex flex-col items-center justify-center">
              <Users className="w-6 h-6 text-epsilon-blue mb-2" />
              <h3 className="font-medium">Mid-Tier Members</h3>
              <p className="text-xs text-gray-500 text-center">Within 20% of Silver Tier</p>
            </div>
            
            {/* Connector */}
            <div className="w-8 h-0.5 bg-gray-300"></div>
            
            {/* Email Node */}
            <div className="w-48 p-3 bg-epsilon-green/10 rounded-lg flex flex-col items-center justify-center">
              <Mail className="w-6 h-6 text-epsilon-green mb-2" />
              <h3 className="font-medium">Email</h3>
              <p className="text-xs text-gray-500 text-center">"You're Almost Silver!"</p>
            </div>
            
            {/* Connector */}
            <div className="w-8 h-0.5 bg-gray-300"></div>
            
            {/* Wait Node */}
            <div className="w-36 p-3 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
              <Clock className="w-6 h-6 text-gray-500 mb-2" />
              <h3 className="font-medium">Wait</h3>
              <p className="text-xs text-gray-500 text-center">2 Days</p>
            </div>
            
            {/* Connector */}
            <div className="w-8 h-0.5 bg-gray-300"></div>
            
            {/* Decision Node */}
            <div className="w-48 p-3 bg-epsilon-amber/10 rounded-lg flex flex-col items-center justify-center">
              <GitBranch className="w-6 h-6 text-epsilon-amber mb-2" />
              <h3 className="font-medium">Check Engagement</h3>
              <p className="text-xs text-gray-500 text-center">Did member engage?</p>
            </div>
            
            {/* Connector with Split */}
            <div className="relative w-12">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300"></div>
              <div className="absolute top-[-30px] left-0 w-0.5 h-[60px] bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
            </div>
            
            {/* Split Nodes in column */}
            <div className="flex flex-col space-y-6">
              {/* Push Node (top branch) */}
              <div className="w-48 p-3 bg-epsilon-amber/10 rounded-lg flex flex-col items-center justify-center">
                <Bell className="w-6 h-6 text-epsilon-amber mb-2" />
                <h3 className="font-medium">Push</h3>
                <p className="text-xs text-gray-500 text-center">"Silver Status..."</p>
              </div>
              
              {/* SMS Node (bottom branch) */}
              <div className="w-48 p-3 bg-epsilon-red/10 rounded-lg flex flex-col items-center justify-center">
                <MessageSquare className="w-6 h-6 text-epsilon-red mb-2" />
                <h3 className="font-medium">SMS</h3>
                <p className="text-xs text-gray-500 text-center">"2 Purchases Away!"</p>
              </div>
            </div>
            
            {/* Connector with Merge */}
            <div className="relative w-12">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-300"></div>
              <div className="absolute top-[-30px] left-0 w-0.5 h-[60px] bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
            </div>
            
            {/* Exit Node */}
            <div className="w-32 p-3 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
              <h3 className="font-medium">End</h3>
              <p className="text-xs text-gray-500 text-center">Exit</p>
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

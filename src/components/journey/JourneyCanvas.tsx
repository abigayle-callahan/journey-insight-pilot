
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
        {/* Silver Tier Upgrade Journey */}
        <div className="flex flex-col items-center">
          {/* Entry Node - Audience */}
          <div className="w-64 p-4 bg-epsilon-blue/10 rounded-lg mb-4 flex flex-col items-center justify-center">
            <Users className="w-8 h-8 text-epsilon-blue mb-2" />
            <h3 className="font-medium">Mid-Tier Members</h3>
            <p className="text-xs text-gray-500 text-center">Within 20% of Silver Tier qualification</p>
          </div>
          
          <div className="h-8 border-l-2 border-gray-300"></div>
          
          {/* Email Node */}
          <div className="w-64 p-4 bg-epsilon-green/10 rounded-lg mb-4 flex flex-col items-center justify-center">
            <Mail className="w-8 h-8 text-epsilon-green mb-2" />
            <h3 className="font-medium">Email</h3>
            <p className="text-xs text-gray-500 text-center">"You're Almost Silver!"</p>
          </div>
          
          <div className="h-8 border-l-2 border-gray-300"></div>
          
          {/* Wait Node */}
          <div className="w-64 p-4 bg-gray-100 rounded-lg mb-4 flex flex-col items-center justify-center">
            <Clock className="w-8 h-8 text-gray-500 mb-2" />
            <h3 className="font-medium">Wait</h3>
            <p className="text-xs text-gray-500 text-center">2 Days</p>
          </div>
          
          <div className="h-8 border-l-2 border-gray-300"></div>
          
          {/* Decision Node */}
          <div className="w-64 p-4 bg-epsilon-amber/10 rounded-lg mb-4 flex flex-col items-center justify-center">
            <GitBranch className="w-8 h-8 text-epsilon-amber mb-2" />
            <h3 className="font-medium">Check Engagement</h3>
            <p className="text-xs text-gray-500 text-center">Did member engage with email?</p>
          </div>
          
          <div className="h-8 border-l-2 border-gray-300"></div>
          
          {/* Branching paths */}
          <div className="flex space-x-32 relative">
            {/* Left Branch: Connector Lines */}
            <div className="absolute top-0 left-1/2 w-32 h-8 border-t-2 border-l-2 border-gray-300 -translate-x-full"></div>
            {/* Right Branch: Connector Lines */}
            <div className="absolute top-0 left-1/2 w-32 h-8 border-t-2 border-r-2 border-gray-300"></div>
          </div>
          
          <div className="flex space-x-32 mb-4">
            {/* Left Branch: SMS for non-engaged */}
            <div className="flex flex-col items-center">
              <div className="h-8 border-l-2 border-gray-300"></div>
              <div className="w-64 p-4 bg-epsilon-red/10 rounded-lg flex flex-col items-center justify-center">
                <MessageSquare className="w-8 h-8 text-epsilon-red mb-2" />
                <h3 className="font-medium">SMS</h3>
                <p className="text-xs text-gray-500 text-center">"Still 2 Purchases Away!"</p>
              </div>
            </div>
            
            {/* Right Branch: Push for engaged */}
            <div className="flex flex-col items-center">
              <div className="h-8 border-l-2 border-gray-300"></div>
              <div className="w-64 p-4 bg-epsilon-amber/10 rounded-lg flex flex-col items-center justify-center">
                <Bell className="w-8 h-8 text-epsilon-amber mb-2" />
                <h3 className="font-medium">Push Notification</h3>
                <p className="text-xs text-gray-500 text-center">"Silver Status Looks Good on You."</p>
              </div>
            </div>
          </div>
          
          {/* Converging paths */}
          <div className="flex space-x-32 relative">
            {/* Left Branch: Connector Lines */}
            <div className="absolute top-0 left-1/2 w-32 h-16 border-b-2 border-l-2 border-gray-300 -translate-x-full"></div>
            {/* Right Branch: Connector Lines */}
            <div className="absolute top-0 left-1/2 w-32 h-16 border-b-2 border-r-2 border-gray-300"></div>
          </div>
          
          <div className="h-8 border-l-2 border-gray-300"></div>
          
          {/* Exit Node */}
          <div className="w-64 p-4 bg-gray-200 rounded-lg flex flex-col items-center justify-center">
            <h3 className="font-medium">Journey End</h3>
            <p className="text-xs text-gray-500 text-center">Exit node</p>
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

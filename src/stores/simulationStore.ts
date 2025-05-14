import { create } from 'zustand';
import { SimulationConfig, SimulationResult, Notification } from '@/types/simulation';
import { toast } from 'sonner';

interface SimulationStore {
  simulations: SimulationResult[];
  activeSimulation: SimulationResult | null;
  completedSimulation: SimulationResult | null;
  notifications: Notification[];
  startSimulation: (config: SimulationConfig) => void;
  completeSimulation: (simulationId: string) => void;
  setActiveSimulation: (simulation: SimulationResult | null) => void;
  markNotificationAsRead: (simulationId: string) => void;
}

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useSimulationStore = create<SimulationStore>((set) => ({
  simulations: [],
  activeSimulation: null,
  completedSimulation: null,
  notifications: [],
  
  startSimulation: (config) => {
    const simulationId = generateId();
    const newSimulation: SimulationResult = {
      ...config,
      id: simulationId,
      journeyName: 'Silver Tier Upgrade Campaign',
      journeyVersion: '1.0',
      status: 'running',
      startedAt: new Date().toISOString(),
      audienceSize: config.audiences.reduce((sum, audience) => sum + audience.count, 0),
      metrics: {
        conversionRate: 0,
        conversionRateDelta: 0,
        fatigue: 0,
        fatigueDelta: 0,
        dropOffRate: 0,
        dropOffRateDelta: 0,
        revenueImpact: 0
      },
      channelPerformance: [],
      audienceInsights: [],
      recommendations: []
    };
    
    set((state) => ({
      simulations: [newSimulation, ...state.simulations],
      activeSimulation: newSimulation,
      completedSimulation: null
    }));
    
    toast.info('Simulation started', {
      description: 'This will take 20+ minutes to complete. You can navigate away from this page.'
    });
    
    // Simulate a long-running process with a timeout
    setTimeout(() => {
      set((state) => {
        const simulationToUpdate = state.simulations.find(s => s.id === simulationId);
        if (!simulationToUpdate) return state;
        
        // Update the simulation with Silver Tier campaign results
        const updatedSimulation: SimulationResult = {
          ...simulationToUpdate,
          status: 'completed',
          completedAt: new Date().toISOString(),
          metrics: {
            conversionRate: 14.7,
            conversionRateDelta: 3.2,
            fatigue: 22,
            fatigueDelta: -3,
            dropOffRate: 12.3,
            dropOffRateDelta: -2.1,
            revenueImpact: 456800
          },
          channelPerformance: [
            { name: 'Email', engagementRate: 37 },
            { name: 'Push Notification', engagementRate: 24 },
            { name: 'SMS', engagementRate: 31 }
          ],
          audienceInsights: [
            {
              segment: 'Gen Z Members',
              conversionRate: 16.8,
              engagement: 48,
              clickRate: 27.3,
              fatigue: 18
            },
            {
              segment: 'Non-Gen Z Members',
              conversionRate: 11.2,
              engagement: 34,
              clickRate: 19.6,
              fatigue: 26
            }
          ],
          recommendations: [
            {
              title: 'Delay SMS for Gen Z by 24 hours',
              description: 'Gen Z members show higher opt-out rates when receiving SMS messages too soon after email.',
              impact: 'High',
              effort: 'Low'
            },
            {
              title: 'Use emotional framing in push notifications',
              description: 'Tests show emotional framing in push notifications increases engagement by 1.6x for this audience.',
              impact: 'Medium',
              effort: 'Medium'
            },
            {
              title: 'Add social proof element to email content',
              description: 'Including how many members upgraded last month could increase conversion rates by 8%.',
              impact: 'High',
              effort: 'Low'
            }
          ]
        };
        
        // Create a notification
        const newNotification: Notification = {
          id: generateId(),
          simulationId: simulationId,
          message: 'Simulation completed for Silver Tier Upgrade Campaign',
          timestamp: new Date().toISOString(),
          read: false
        };
        
        return {
          simulations: state.simulations.map(s => 
            s.id === simulationId ? updatedSimulation : s
          ),
          activeSimulation: null,
          completedSimulation: updatedSimulation,
          notifications: [newNotification, ...state.notifications]
        };
      });
    }, 30000); // Shortened to 30 seconds for demo purposes
  },
  
  completeSimulation: (simulationId) => {
    set((state) => ({
      simulations: state.simulations.map(s => 
        s.id === simulationId 
          ? { ...s, status: 'completed', completedAt: new Date().toISOString() } 
          : s
      ),
      activeSimulation: state.activeSimulation?.id === simulationId 
        ? null 
        : state.activeSimulation
    }));
  },
  
  setActiveSimulation: (simulation) => {
    set({ activeSimulation: simulation });
  },
  
  markNotificationAsRead: (simulationId) => {
    set((state) => ({
      notifications: state.notifications.map(n => 
        n.simulationId === simulationId ? { ...n, read: true } : n
      )
    }));
  }
}));

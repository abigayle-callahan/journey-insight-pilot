
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
      journeyName: 'Summer Campaign Journey',
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
        
        // Update the simulation with results
        const updatedSimulation: SimulationResult = {
          ...simulationToUpdate,
          status: 'completed',
          completedAt: new Date().toISOString(),
          metrics: {
            conversionRate: 12.4,
            conversionRateDelta: 2.1,
            fatigue: 28,
            fatigueDelta: -5,
            dropOffRate: 15.7,
            dropOffRateDelta: -1.3,
            revenueImpact: 342500
          },
          channelPerformance: [
            { name: 'Email', engagementRate: 32 },
            { name: 'Push Notification', engagementRate: 18 },
            { name: 'SMS', engagementRate: 24 },
            { name: 'In-app Message', engagementRate: 45 }
          ],
          audienceInsights: [
            {
              segment: 'High Value Customers',
              conversionRate: 18.2,
              engagement: 52,
              clickRate: 24.5,
              fatigue: 22
            },
            {
              segment: 'Recently Churned',
              conversionRate: 6.8,
              engagement: 28,
              clickRate: 12.3,
              fatigue: 34
            }
          ],
          recommendations: [
            {
              title: 'Adjust timing for Recently Churned segment',
              description: 'Consider adding a 2-day delay before sending the follow-up message to reduce fatigue.',
              impact: 'High',
              effort: 'Low'
            },
            {
              title: 'Test alternative messaging for push notifications',
              description: 'Push notifications show lower engagement. Try more personalized content.',
              impact: 'Medium',
              effort: 'Medium'
            },
            {
              title: 'Increase email frequency for High Value segment',
              description: 'This segment shows high engagement with low fatigue, suggesting room for more touchpoints.',
              impact: 'High',
              effort: 'Low'
            }
          ]
        };
        
        // Create a notification
        const newNotification: Notification = {
          id: generateId(),
          simulationId: simulationId,
          message: 'Simulation completed for Summer Campaign Journey',
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

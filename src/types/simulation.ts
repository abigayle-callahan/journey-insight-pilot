
export type SimulationStatus = 'running' | 'completed' | 'failed';
export type SimulationGoal = 'conversions' | 'fatigue';

export interface Audience {
  id: string;
  name: string;
  count: number;
}

export interface ContentAsset {
  id: string;
  name: string;
}

export interface SimulationConfig {
  timeframe: number;
  goal: SimulationGoal;
  journeyId: string;
  audiences: Audience[];
  contentAssets: ContentAsset[];
}

export interface ChannelPerformance {
  name: string;
  engagementRate: number;
}

export interface AudienceInsight {
  segment: string;
  conversionRate: number;
  engagement: number;
  clickRate: number;
  fatigue: number;
}

export interface Recommendation {
  title: string;
  description: string;
  impact: string;
  effort: string;
}

export interface SimulationMetrics {
  conversionRate: number;
  conversionRateDelta: number;
  fatigue: number;
  fatigueDelta: number;
  dropOffRate: number;
  dropOffRateDelta: number;
  revenueImpact: number;
}

export interface SimulationResult extends SimulationConfig {
  id: string;
  journeyName: string;
  journeyVersion: string;
  status: SimulationStatus;
  startedAt: string;
  completedAt?: string;
  audienceSize: number;
  metrics: SimulationMetrics;
  channelPerformance: ChannelPerformance[];
  audienceInsights: AudienceInsight[];
  recommendations: Recommendation[];
}

export interface Notification {
  id: string;
  simulationId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

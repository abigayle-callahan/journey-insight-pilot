
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSimulationStore } from '@/stores/simulationStore';
import { SimulationResult } from '@/types/simulation';
import { 
  FileText, 
  BarChart, 
  Users, 
  Lightbulb, 
  Calendar, 
  Cpu, 
  ArrowRight, 
  DollarSign, 
  ChevronDown, 
  ChevronUp,
  SplitSquareVertical 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const ResultsDrawer = ({ 
  open, 
  onOpenChange,
  result,
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  result: SimulationResult | null;
}) => {
  const navigate = useNavigate();
  const [showTechDetails, setShowTechDetails] = useState(false);
  
  if (!result) return null;

  const handleViewFullReport = () => {
    onOpenChange(false);
    navigate(`/simulations?id=${result.id}`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Simulation Results</SheetTitle>
          <SheetDescription>
            Completed on {new Date(result.completedAt).toLocaleString()}
          </SheetDescription>
        </SheetHeader>
        
        <Tabs defaultValue="summary" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="recommendations">Insights</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-epsilon-blue">
                    {result.metrics.conversionRate}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.metrics.conversionRate > 5 ? '↑' : '↓'} {Math.abs(result.metrics.conversionRateDelta)}% vs. previous
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Customer Fatigue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">
                      <Progress value={result.metrics.fatigue} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">
                      {result.metrics.fatigue}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.metrics.fatigueDelta < 0 ? '↓' : '↑'} {Math.abs(result.metrics.fatigueDelta)}% vs. previous
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Drop-off Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-epsilon-amber">
                    {result.metrics.dropOffRate}%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.metrics.dropOffRateDelta < 0 ? '↓' : '↑'} {Math.abs(result.metrics.dropOffRateDelta)}% vs. previous
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Revenue Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-epsilon-green">
                    ${result.metrics.revenueImpact.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Estimated over {result.timeframe} days
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Metrics</CardTitle>
                <CardDescription>Silver Tier Upgrade Campaign specific metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Opt-Out Risk (SMS)</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-full">
                        <Progress value={18} className="h-2" />
                      </div>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <p className="text-xs text-gray-500">3% lower than benchmark</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Expected ROI Uplift</h4>
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-epsilon-green" />
                      <span className="text-lg font-bold text-epsilon-green">2.4x</span>
                    </div>
                    <p className="text-xs text-gray-500">Based on historical conversion data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance by Channel</CardTitle>
                <CardDescription>Predicted engagement across channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.channelPerformance.map((channel) => (
                    <div key={channel.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{channel.name}</span>
                        <span className="text-sm">{channel.engagementRate}%</span>
                      </div>
                      <Progress value={channel.engagementRate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* How the Simulator Works - Collapsible Section */}
            <div className="border rounded-md overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-3 text-left bg-epsilon-light-blue/50"
                onClick={() => setShowTechDetails(!showTechDetails)}
              >
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 mr-2 text-epsilon-blue" />
                  <span className="font-medium text-epsilon-blue">How the Intent Loop Simulator Works</span>
                </div>
                {showTechDetails ? 
                  <ChevronUp className="h-4 w-4 text-epsilon-blue" /> : 
                  <ChevronDown className="h-4 w-4 text-epsilon-blue" />
                }
              </button>
              
              {showTechDetails && (
                <div className="p-4 space-y-3 bg-epsilon-light-blue/20">
                  <div>
                    <h4 className="font-medium">1. Behavioral Models</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      The simulator creates predictive models based on historical customer data, including response patterns, 
                      engagement metrics, and conversion behaviors across different segments.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">2. Synthetic Agents</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      For each audience segment, we generate thousands of virtual customers (agents) that simulate real-world
                      behaviors. These agents have unique attributes and decision patterns based on your historical data.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">3. Journey Traversal</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Each synthetic agent navigates through your journey based on the defined path, making decisions at 
                      each step that mirror real customer behavior, including opening emails, clicking links, 
                      abandoning journeys, or converting.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">4. Machine Learning Analysis</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      After simulation, our ML algorithms analyze the aggregate data to identify patterns, bottlenecks, 
                      and opportunities for improvement, generating actionable recommendations with predicted impact.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="audience" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Segment Performance
                </CardTitle>
                <CardDescription>
                  How each audience segment responds to the journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {result.audienceInsights.map((segment) => (
                  <div key={segment.segment} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{segment.segment}</h4>
                      <span className={`text-sm font-medium ${segment.conversionRate > 15 ? 'text-epsilon-green' : segment.conversionRate > 8 ? 'text-epsilon-amber' : 'text-epsilon-red'}`}>
                        {segment.conversionRate}% conversion
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Engagement</p>
                        <p className="font-medium">{segment.engagement}%</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Click Rate</p>
                        <p className="font-medium">{segment.clickRate}%</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-xs text-gray-500">Fatigue</p>
                        <p className="font-medium">{segment.fatigue}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Optimal Channel Timing</CardTitle>
                <CardDescription>Recommended send times for each segment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Gen Z Members</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">Evening (6-8 PM)</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Push</p>
                      <p className="font-medium">Late Evening (9-11 PM)</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">SMS</p>
                      <p className="font-medium">Afternoon (2-4 PM)</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Non-Gen Z Members</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">Morning (8-10 AM)</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Push</p>
                      <p className="font-medium">Afternoon (1-3 PM)</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">SMS</p>
                      <p className="font-medium">Morning (10-12 PM)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>
                  Suggestions to optimize your journey based on simulation data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="border-l-4 border-epsilon-blue pl-4 py-1">
                    <p className="font-medium">{recommendation.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                    <p className="text-xs text-epsilon-blue mt-2">
                      {recommendation.impact} impact · {recommendation.effort} effort
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Simulation Details
                </CardTitle>
                <CardDescription>
                  Information about this simulation run
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Campaign Name</p>
                    <p className="font-medium">Silver Tier Upgrade Campaign</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Journey Version</p>
                    <p className="font-medium">v{result.journeyVersion}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Simulation ID</p>
                    <p className="font-medium text-sm">{result.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Started</p>
                    <p className="font-medium">
                      {new Date(result.startedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="font-medium">
                      {new Date(result.completedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Timeframe</p>
                    <p className="font-medium">{result.timeframe} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Goal Priority</p>
                    <p className="font-medium capitalize">{result.goal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Audience</p>
                    <p className="font-medium">
                      {result.audienceSize.toLocaleString()} members
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Included Assets</CardTitle>
                <CardDescription>Content and audiences used in this simulation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Audience Segments</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        <p className="font-medium">Mid-Tier Members</p>
                        <p className="text-xs text-gray-500">12,500 members</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        <p className="font-medium">Near Silver Qualification</p>
                        <p className="text-xs text-gray-500">4,800 members</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Content Assets</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        <p className="font-medium">"Almost Silver" Email</p>
                        <p className="text-xs text-gray-500">ID: EMAIL-ST-001</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        <p className="font-medium">"Silver Status" Push Notification</p>
                        <p className="text-xs text-gray-500">ID: PUSH-ST-002</p>
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        <p className="font-medium">"2 Purchases Away" SMS</p>
                        <p className="text-xs text-gray-500">ID: SMS-ST-003</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <SheetFooter className="mt-4 flex-col items-stretch gap-2 sm:items-center">
          <Button 
            variant="outline" 
            className="flex gap-2 w-full" 
            onClick={() => {}}
          >
            <SplitSquareVertical className="h-4 w-4" />
            Compare with Another Simulation
          </Button>
          <Button 
            variant="default" 
            className="w-full" 
            onClick={handleViewFullReport}
          >
            View Full Report
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

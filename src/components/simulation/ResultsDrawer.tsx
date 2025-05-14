
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
import { FileText, BarChart, Users, Lightbulb, Calendar } from 'lucide-react';

export const ResultsDrawer = ({ 
  open, 
  onOpenChange,
  result,
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
  result: SimulationResult | null;
}) => {
  if (!result) return null;

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
                    <p className="text-xs text-epsilon-blue mt-1">
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
                      {result.audienceSize.toLocaleString()} profiles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <SheetFooter className="mt-4">
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

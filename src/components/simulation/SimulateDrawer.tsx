
import { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Users, 
  FileText, 
  BarChart, 
  Loader,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSimulationStore } from '@/stores/simulationStore';

type TimeframeOption = '3' | '7' | '14';
type GoalOption = 'conversions' | 'fatigue';

export const SimulateDrawer = ({ 
  open, 
  onOpenChange 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>('7');
  const [goal, setGoal] = useState<GoalOption>('conversions');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { startSimulation } = useSimulationStore();
  
  const handleRunSimulation = () => {
    setIsSubmitting(true);
    
    // Start simulation with a small delay to show loading state
    setTimeout(() => {
      startSimulation({
        timeframe: parseInt(timeframe),
        goal,
        journeyId: 'summer-campaign',
        audiences: [
          { id: 'high-value', name: 'High Value Customers', count: 250000 },
          { id: 'churned', name: 'Recently Churned', count: 120000 },
        ],
        contentAssets: [
          { id: 'summer-promo', name: 'Summer Promotion Email' },
          { id: 'discount-code', name: 'Personalized Discount Code' },
          { id: 'reminder', name: 'Reminder Notification' },
        ]
      });
      
      setIsSubmitting(false);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Configure Simulation</SheetTitle>
          <SheetDescription>
            Set parameters for your journey simulation
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Linked Audiences
            </h3>
            <div className="bg-gray-50 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium">High Value Customers</p>
                  <p className="text-sm text-gray-500">250,000 profiles</p>
                </div>
                <Button variant="ghost" size="sm" className="text-epsilon-blue" asChild>
                  <a href="#" className="flex items-center">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Recently Churned</p>
                  <p className="text-sm text-gray-500">120,000 profiles</p>
                </div>
                <Button variant="ghost" size="sm" className="text-epsilon-blue" asChild>
                  <a href="#" className="flex items-center">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Content Assets
            </h3>
            <div className="bg-gray-50 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Summer Promotion Email</p>
                <Button variant="ghost" size="sm" className="text-epsilon-blue" asChild>
                  <a href="#" className="flex items-center">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Personalized Discount Code</p>
                <Button variant="ghost" size="sm" className="text-epsilon-blue" asChild>
                  <a href="#" className="flex items-center">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium">Reminder Notification</p>
                <Button variant="ghost" size="sm" className="text-epsilon-blue" asChild>
                  <a href="#" className="flex items-center">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Simulation Timeframe
            </h3>
            <RadioGroup 
              defaultValue="7" 
              value={timeframe}
              onValueChange={(value) => setTimeframe(value as TimeframeOption)}
              className="flex space-x-2"
            >
              {['3', '7', '14'].map((days) => (
                <div key={days} className="flex-1">
                  <RadioGroupItem
                    value={days}
                    id={`timeframe-${days}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`timeframe-${days}`}
                    className={cn(
                      "flex flex-col items-center justify-between rounded-md border-2 border-muted p-3 hover:bg-muted/20 peer-data-[state=checked]:border-epsilon-blue [&:has([data-state=checked])]:border-epsilon-blue",
                      timeframe === days && "bg-epsilon-light-blue"
                    )}
                  >
                    <span className="text-lg font-medium">{days}</span>
                    <span className="text-sm text-muted-foreground">Days</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Simulation Goal Priority
            </h3>
            <RadioGroup 
              defaultValue="conversions"
              value={goal}
              onValueChange={(value) => setGoal(value as GoalOption)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conversions" id="goal-conversions" />
                <Label htmlFor="goal-conversions" className="font-medium">
                  Maximize Conversions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fatigue" id="goal-fatigue" />
                <Label htmlFor="goal-fatigue" className="font-medium">
                  Minimize Customer Fatigue
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-2">
          <Button 
            onClick={handleRunSimulation}
            disabled={isSubmitting}
            className="bg-epsilon-blue hover:bg-epsilon-blue/90"
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Starting Simulation
              </>
            ) : (
              'Run Simulation'
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

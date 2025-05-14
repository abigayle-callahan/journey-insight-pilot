
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Clock, 
  ArrowUpDown,
  Eye,
  RotateCw
} from 'lucide-react';
import { useSimulationStore } from '@/stores/simulationStore';
import { SimulationResult } from '@/types/simulation';
import { ResultsDrawer } from '@/components/simulation/ResultsDrawer';
import { Badge } from '@/components/ui/badge';

export default function SimulationHistoryPage() {
  const { simulations, startSimulation } = useSimulationStore();
  const [selectedResult, setSelectedResult] = useState<SimulationResult | null>(null);
  const [isResultsDrawerOpen, setIsResultsDrawerOpen] = useState(false);
  
  const handleViewResults = (result: SimulationResult) => {
    setSelectedResult(result);
    setIsResultsDrawerOpen(true);
  };
  
  const handleRerunSimulation = (simulation: SimulationResult) => {
    startSimulation({
      timeframe: simulation.timeframe,
      goal: simulation.goal,
      journeyId: simulation.journeyId,
      audiences: simulation.audiences,
      contentAssets: simulation.contentAssets,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Simulation History</h1>
          <p className="text-gray-500">
            View past simulations and their results
          </p>
        </div>
        <Button asChild>
          <a href="/">
            <BarChart className="mr-2 h-4 w-4" />
            Run New Simulation
          </a>
        </Button>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Journey Name</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Date
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Timeframe</TableHead>
              <TableHead>Goal Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Conversion Rate</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {simulations.length > 0 ? (
              simulations.map((simulation) => (
                <TableRow key={simulation.id}>
                  <TableCell className="font-medium">
                    {simulation.journeyName}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-3 w-3 text-gray-500" />
                      {new Date(simulation.completedAt || simulation.startedAt).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{simulation.timeframe} days</TableCell>
                  <TableCell className="capitalize">{simulation.goal}</TableCell>
                  <TableCell>
                    <Badge variant={
                      simulation.status === 'completed' 
                        ? 'default' 
                        : simulation.status === 'running' 
                          ? 'outline' 
                          : 'destructive'
                    }
                    className={
                      simulation.status === 'completed' 
                        ? 'bg-epsilon-green' 
                        : ''
                    }>
                      {simulation.status === 'running' && 
                        <span className="mr-1 h-2 w-2 rounded-full bg-epsilon-amber animate-pulse inline-block"></span>
                      }
                      {simulation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {simulation.status === 'completed' ? `${simulation.metrics.conversionRate}%` : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      {simulation.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewResults(simulation)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={simulation.status === 'running'}
                        onClick={() => handleRerunSimulation(simulation)}
                      >
                        <RotateCw className="h-3.5 w-3.5 mr-1" />
                        Re-run
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <p className="text-gray-500">No simulation history found</p>
                  <Button variant="outline" className="mt-2" asChild>
                    <a href="/">Run your first simulation</a>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {selectedResult && (
        <ResultsDrawer 
          open={isResultsDrawerOpen} 
          onOpenChange={setIsResultsDrawerOpen}
          result={selectedResult}
        />
      )}
    </div>
  );
}

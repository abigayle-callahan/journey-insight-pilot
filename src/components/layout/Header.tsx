
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSimulationStore } from '@/stores/simulationStore';

export const Header = () => {
  const { notifications } = useSimulationStore();
  const notificationCount = notifications.filter(n => !n.read).length;

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            <Link to="/">
              <span className="text-epsilon-blue">Epsilon</span> Journey Orchestration
            </Link>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {notificationCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-epsilon-red p-0 text-xs text-white">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </div>
          <div className="h-8 w-8 rounded-full bg-epsilon-blue text-white flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

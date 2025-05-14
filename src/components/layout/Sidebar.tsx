
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  MessageCircle, 
  FileText, 
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutGrid, label: 'Campaigns', path: '/' },
  { icon: MessageCircle, label: 'Messages', path: '/messages' },
  { icon: FileText, label: 'Content', path: '/content' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="w-64 border-r border-gray-200 bg-white">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto py-2">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-epsilon-light-blue text-epsilon-blue"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

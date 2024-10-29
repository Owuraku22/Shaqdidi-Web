import { Bell, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import notificationSoundUrl from '/notification-sound.wav';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { Icons } from '../icons/icons';
import { useAuth, useStoreData } from '@/store/state';
import { onMessageListener } from '@/lib/firebase';
import { Toast } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  psShowLogo?: boolean
}

interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

export default function Header({ onMenuClick, title, psShowLogo = false }: HeaderProps) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [play] = useSound(notificationSoundUrl);
  const { user } = useAuth();
  const { logout } = useStoreData();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onMessageListener().then((payload: any) => {
      const { notification } = payload;
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: notification.title,
        body: notification.body,
        timestamp: Date.now(),
      };
      setNotifications(prev => [newNotification, ...prev]);
      play();
      toast({
        title: notification.title,
        description: notification.body,
      });
    });

    return () => {
      unsubscribe;
    };
  }, [play, toast]);

  const handleNotificationClick = () => {
    // Here you would typically open a notifications panel
    console.log('Open notifications panel');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b shadow border-gray-200 px-6 md:px-10 space-x-4 py-2 flex justify-between w-full items-center ">
      <div className="flex items-center justify-start space-x-4">
        <img src="/logo.svg" alt="ShaQ D|D" className={cn("h-10 mx-4", {
          'md:hidden': psShowLogo
        })} />
        <h2 className="text-xl  md:block hidden text-primary">{title}</h2>
      </div>
      
      <div className="flex items-center space-x-4 mr-4">
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
                <Icons.Bell className="md:h-6 md:w-6 h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge
                    variant="default"
                    className="absolute bg-green-500 -top-1 -right-1 px-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <h3 className="font-semibold mb-2">Notifications</h3>
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500">No new notifications</p>
              ) : (
                <ul className="space-y-2">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="text-sm">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-gray-500">{notification.body}</p>
                      <small className="text-gray-400">
                        {new Date(notification.timestamp).toLocaleString()}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="hover:cursor-pointer hover:bg-primary hover:text-white w-8 h-8">
              <AvatarImage src="/avatar.png" alt={user?.name || 'User'} />
              <AvatarFallback className='bg-ring'>
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className=''>
            <h5 className="text-base font-semibold">
              {user?.name || 'User'}
            </h5>
            <span className='text-sm text-gray-500'>{user?.email || 'No email available'}</span>
            <div className="flex justify-center items-center mt-2 w-full">
              <Button 
                className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-offset-0"
                variant="ghost"
                onClick={handleLogout}
              >
                <LogOut className='w-4 h-4 mr-4' />
                Logout
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
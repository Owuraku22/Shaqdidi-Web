import { Bell, LogOut, Menu, X } from 'lucide-react';
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
import { messaging, onMessageListener } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { signOut } from '@/lib/api';
import { MessagePayload, onMessage } from 'firebase/messaging';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  psShowLogo?: boolean
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
}

export default function Header({ onMenuClick, title, psShowLogo = false }: HeaderProps) {
  const navigate = useNavigate();
  const [play] = useSound(notificationSoundUrl);
  const { user, fbToken } = useAuth();
  const { logout } = useStoreData();
  const { toast } = useToast();
  const { setNotifications: setNotificationsStore, notifications: notificationsStore } = useStoreData()
  const [notifications, setNotifications] = useState<Notification[]>(notificationsStore!);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload: MessagePayload) => {
      const { notification } = payload;
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: "Order Confirmation:",
        body: `Your order from ${notification?.title} has been confirmed!`,
        timestamp: Date.now(),
      };
      setNotificationsStore(newNotification);
      setNotifications(prev => [newNotification, ...prev]);
      play();
      toast({
        title: notification?.title,
        description: notification?.body,
      });
    })

    return () => {
      unsubscribe();
    };
  }, [play, toast]);

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleLogout = async () => {
    const fb_token =  fbToken!;
    await signOut(fb_token)
    logout();
    navigate('/');
  };

  const formatNotificationTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <header className="bg-white border-b shadow border-gray-200 px-4 md:px-10 py-2 flex justify-between w-full items-center">
      <div className="flex items-center justify-start space-x-4">
      <Button variant="ghost" size="icon" className={
        cn('md:hidden', {
          'hidden': !psShowLogo
        })
      } onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
      </Button>
        <img src="/logo.svg" alt="ShaQ D|D" className={cn("h-10", {
          'md:hidden': psShowLogo
        })} />
        <h2 className="text-xl md:block hidden text-primary">{title}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.Bell className="md:h-6 md:w-6 h-5 w-5" />
                {notifications?.length > 0 && (
                  <Badge
                    variant="default"
                    className="absolute bg-green-500 -top-1 -right-1 px-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
                  >
                    {notifications?.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0">
              <div className="flex items-center justify-between border-b p-4">
                <h3 className="font-semibold text-lg text-primary">Notifications</h3>
                {notifications?.length > 0 && (
                  <button
                    onClick={handleClearAllNotifications}
                    className="text-primary text-sm hover:text-red-600"
                  >
                    Clear All Notifications
                  </button>
                )}
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {notifications?.length === 0 ? (
                  <p className="text-sm text-gray-500 p-4">No new notifications</p>
                ) : (
                  <div className="divide-y">
                    {notifications?.map((notification) => (
                      <div key={notification.id} className="p-4 relative hover:bg-gray-50">
                        <button
                          onClick={() => handleDismissNotification(notification.id)}
                          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="flex gap-3">
                          <div className="mt-0.5">
                            <Bell className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="pr-6">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatNotificationTime(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="hover:cursor-pointer hover:bg-primary text-white w-8 h-8">
              <AvatarImage src="/avatar.png" alt={user?.name || 'User'} />
              <AvatarFallback className='bg-ring'>
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-4">
            <div className="space-y-2">
              <h5 className="font-semibold">
                {user?.name || 'User'}
              </h5>
              <p className='text-sm text-gray-500'>{user?.email || 'No email available'}</p>
              <p className='text-sm text-gray-500'>{user?.phone_number || '0239488858'}</p>
              <button 
                className="flex items-center gap-2 mt-4 text-sm text-gray-600 hover:text-primary focus-visible:outline-none focus-visible:ring-0"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
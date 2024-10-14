import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import useSound from 'use-sound';
import { useEffect, useState } from 'react';
import notificationSoundUrl from '/notification-sound.wav';
import notificationSoundUrl2 from '/notification-sound-2.mp3';



interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}


export default function Header({ onMenuClick, title }: HeaderProps) {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);
  const [play] = useSound(notificationSoundUrl);

  useEffect(() => {
    // Simulating incoming notifications
    const interval = setInterval(() => {
      setNotificationCount((prevCount) => prevCount + 1);
      play();
    }, 300000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, [play]);

  const handleNotificationClick = () => {
    // Reset notification count when clicked
    setNotificationCount(0);
    // Here you would typically open a notifications panel
    console.log('Open notifications panel');
  };


  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex justify-between w-full items-center ">
      <div className="flex items-center justify-start space-x-4 ">
        <img src="/logo.svg" alt="ShaQ D|D" className="h-10 mx-4 md:hidden" />
        <h2 className="text-xl  md:block hidden text-primary">{title}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
      <div className="relative">
        <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
              <Bell className="md:h-5 md:w-5 h-4 w-4" />
              {notificationCount > 1 ? (
                <Badge
                  variant="default"
                  className="absolute bg-green-500 -top-1 -right-1 px-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs"
                >
                  {notificationCount}
                </Badge>
              ) : (
                notificationCount === 1 && (
                  <Badge
                  variant="default"
                  className="absolute bg-green-500 top-1 right-2 px-0 py-0 w-2 h-2 rounded-full flex items-center justify-center"
                />
                ) 
              )
              
              }
            </Button>
      </div>
        <Avatar onClick={() => navigate('/profile', {replace: true})} className="hover:cursor-pointer">
          <AvatarImage src="/avatar.png" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
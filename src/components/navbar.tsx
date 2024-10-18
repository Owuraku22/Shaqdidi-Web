import { useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Icons } from "./icons/icons";
import Profile from "./permanent-staff-dashboard/profile";
import { Badge } from "@/components/ui/badge"
import useSound from 'use-sound';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import notificationSoundUrl from '/notification-sound.wav';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SheetSide } from "./permanent-staff-dashboard/side-bar";

export default function Navbar() {
    let { pathname } = useLocation();
  const [notificationCount, setNotificationCount] = useState(0);
  const [play] = useSound(notificationSoundUrl);

  useEffect(() => {
    // Simulating incoming notifications
    const interval = setInterval(() => {
      setNotificationCount((prevCount) => prevCount + 1);
      play();
    }, 3000000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, [play]);

  const handleNotificationClick = () => {
    // Reset notification count when clicked
    setNotificationCount(0);
    // Here you would typically open a notifications panel
    console.log('Open notifications panel');
  };


    return(
    <nav className="flex justify-between items-center py-4 px-4 lg:px-8 shadow-sm">
        <div className="flex gap-0 items-center">
            <SheetSide /> {/* MOBILE SIDE BAR */}
            <h1 className="text-primary text-xl">
                { pathname === "/ps" && "Home"}
                { pathname === "/ps/order-history" && "Order History"}
            </h1>
        </div>
        <div className="flex gap-4 items-center">
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
            
          <Profile /> {/* USER PROFILE */}
        </div>
    </nav>
  );
  );
}


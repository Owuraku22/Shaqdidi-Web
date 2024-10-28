import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { useAuth, useStoreData } from '@/store/state';
import { useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { FirebaseError } from 'firebase/app';


const { VITE_APP_VAPID_KEY } = import.meta.env;

const store = useStoreData.setState;

function setFbToken(token: string) {
  store((state) => ({
    ...state,
    fbToken: token,
  }));
}

export async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
            vapidKey: VITE_APP_VAPID_KEY,
          });
    
          setFbToken(token);
          //We can send token to server
      console.log("Firebase Token generated : ", token);
    
      } catch (error: FirebaseError | any) {
        if (error instanceof FirebaseError) {
          toast({
            variant: "destructive",
            title: "Notification Error",
            description: error.message,
          });
        }
        console.log(error);
        
      }
      
    } else if (permission === "denied") {
      //notifications are blocked
      toast({
        variant: "destructive",
        title: "Your Notifications Are Blocked",
        description: `All notifications will be disabled, please enable notifications for Shaqdidi. Refresh the page to try again`,
      });
    }
  }


export function ProtectedRoute() {
  const { isAuth } = useAuth();
  const { setFbToken } = useStoreData()

  
  useEffect(() => {
    requestPermission();
  }, []);

  if (!isAuth) {
    return <Navigate to="" replace />;
  }

  return <Outlet />;
}
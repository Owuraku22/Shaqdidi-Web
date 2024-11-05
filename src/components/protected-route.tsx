import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { useAuth, useStoreData } from '@/store/state';
import { useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { FirebaseError } from 'firebase/app';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from './ui/button';

const { VITE_APP_VAPID_KEY } = import.meta.env;

const store = useStoreData.setState;

function setFbToken(token: string) {
  store((state) => ({
    ...state,
    fbToken: token,
  }));
}

export async function requestPermission() {
  if (!("Notification" in window)) {
    toast({
      variant: "destructive",
      title: "Notifications Error ",
      description: `This browser does not support notifications.`,
    });
}

const permission = await Notification.requestPermission();
console.log(permission);
  if (permission === "granted" || permission === "default") {
    try {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });
      if(!token) return null
      setFbToken(token);
      console.log("Firebase Token generated : ", token);
      return token
    } catch (error: FirebaseError | any) {
      if (error instanceof FirebaseError) {
        toast({
          variant: "destructive",
          title: "Notification Error",
          description: error.message,
        });
      }
      console.log(error);
      return null
    }
    
  } else if (permission === "denied") {
    toast({
      variant: "destructive",
      title: "Your Notifications Are Blocked",
      description: `All notifications will be disabled, please enable notifications for Shaqdidi. Refresh the page to try again`,
    });
  }
  try {
    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });
    if(!token) return null 
    setFbToken(token);
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
    return null
  }
}

export function ProtectedRoute() {
  const { isAuth, user } = useAuth();
  const { setFbToken } = useStoreData();
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    
      requestPermission().then(async (v) => {
        if (!v) return
        const token = await getToken(messaging, {
          vapidKey: VITE_APP_VAPID_KEY,
        });
        if(!token) return null 
        setFbToken(token);
      });

  }, []);

  

  // For non-auth routes, allow access
  if (!isAuth && (location.pathname === '/sign-up' || location.pathname === '/')) {
    return <Outlet />;
  }

  // For protected routes, check authentication
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // Check if the user is trying to access a route they're not authorized for
  const isStaffRoute = location.pathname.startsWith('/ps');
  const isPersonnelRoute = location.pathname.startsWith('/nsp');

  if ((user?.account_type === 'staff' && isPersonnelRoute) || 
      (user?.account_type === 'personnel' && isStaffRoute)) {
    return (
      <div className="flex flex-col space-y-3 items-center justify-center h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Go Back
        </Button>
      </div>
    );
  }

  return <Outlet />;
}
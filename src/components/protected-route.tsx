import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { useAuth, useStoreData } from '@/store/state';
import { useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import { FirebaseError } from 'firebase/app';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const { VITE_APP_VAPID_KEY } = import.meta.env;

const store = useStoreData.setState;

function setFbToken(token: string) {
  store((state) => ({
    ...state,
    fbToken: token,
  }));
}

export async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    try {
      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

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
    }
    
  } else if (permission === "denied") {
    toast({
      variant: "destructive",
      title: "Your Notifications Are Blocked",
      description: `All notifications will be disabled, please enable notifications for Shaqdidi. Refresh the page to try again`,
    });
  }
}

export function ProtectedRoute() {
  const { isAuth, user } = useAuth();
  const { setFbToken } = useStoreData();
  const location = useLocation();

  useEffect(() => {
    if (isAuth) {
      requestPermission();
    }
  }, [isAuth]);

  

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
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <Outlet />;
}
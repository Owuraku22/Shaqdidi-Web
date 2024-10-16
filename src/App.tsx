import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/nsp/layout';
import PsLayout from '@/components/permanent-staff-dashboard/layout'
import Home from '@/routes/home';
import PermanentStaff from '@/routes/permanent-staff';
import Profile from '@/routes/profile';
import { fetchTodayOrders, fetchPreviousOrders, fetchStaffMembers, fetchUserProfile } from '@/lib/api';
import ErrorBoundary from './error-page';
import Dashboard from './routes/dashboard';
import OrderHistory from './components/permanent-staff-dashboard/order-history';

const queryClient = new QueryClient();

const nspRoutes = [
  { path: '/nsp', label: 'Home' },
];

const psRoutes = [
  { path: '/ps', label: 'Home' },
  { path: '/ps/order-history', label: 'Order History' },
];

const router = createBrowserRouter([
  {
    path: '/nsp',
    element: <Layout routes={nspRoutes} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,

        
        errorElement: <ErrorBoundary />,
        loader: async () => {
          const todayOrders = await queryClient.fetchQuery({queryKey: ['todayOrders'], queryFn: fetchTodayOrders});
          const previousOrders = await queryClient.fetchQuery({queryKey: ['previousOrders'], queryFn: fetchPreviousOrders});
          return { todayOrders, previousOrders };
        },
      },
      
    ],
  },
  {
    path: '/ps',
    element: <PsLayout />,
    // element: <Layout isPs routes={psRoutes} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorBoundary />,
        
      },
      {
        path: 'order-history',
        element: <OrderHistory />,
        errorElement: <ErrorBoundary />,

      },
      
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
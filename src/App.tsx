import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/nsp/layout';
import PsLayout from '@/components/permanent-staff-dashboard/layout'
import PsLayout from '@/components/permanent-staff-dashboard/layout';
import Home from '@/routes/home';
import { fetchTodayOrders, fetchPreviousOrders, fetchStaffMembers, fetchUserProfile } from '@/lib/api';
import ErrorBoundary from './error-page';
import OrderHistory from './components/permanent-staff-dashboard/order-history';
import PsDashboardPage from './components/permanent-staff-dashboard/permanent-staff-dashboard';
import { Toaster } from './components/ui/toaster';
import Dashboard from './routes/dashboard';
import OrderHistory from './components/permanent-staff-dashboard/order-history';
import Regiter from './routes/register';
import Login from './routes/login';

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
    path: '/',
    element: <Regiter />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/sign-up',
    element: <Regiter />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/sign-in',
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/nsp',
    element: <Layout routes={nspRoutes} />,
    path: "/nsp",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorBoundary />,
        loader: async () => {
          const todayOrders = await queryClient.fetchQuery({
            queryKey: ["todayOrders"],
            queryFn: fetchTodayOrders,
          });
          const previousOrders = await queryClient.fetchQuery({
            queryKey: ["previousOrders"],
            queryFn: fetchPreviousOrders,
          });
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
  {
    path: "/ps",
    element: <PsLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <PsDashboardPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
        errorElement: <ErrorBoundary />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/nsp/layout';
import PsLayout from '@/components/permanent-staff-dashboard/layout';
import Home from '@/routes/home';
import { fetchTodayOrders, fetchPreviousOrders, fetchStaffMembers, fetchUserProfile } from '@/lib/api';
import ErrorBoundary from './error-page';
import OrderHistory from './components/permanent-staff-dashboard/order-history';
import PsDashboardPage from './components/permanent-staff-dashboard/permanent-staff-dashboard';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

const nspRoutes = [{ path: "/nsp", label: "Home" }];

const psRoutes = [
  { path: "/ps", label: "Home" },
  { path: "/ps/order-history", label: "Order History" },
];

const router = createBrowserRouter([
  {
    path: "/nsp",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorBoundary />,
        loader: async () => {
          const orders = await queryClient.fetchQuery({queryKey: ['orders'], queryFn: fetchOrders});
          console.log('orders', orders)
          return { orders };
        },
      },
    ],
  },
  
  {
    path: "/ps",
    element: <PsLayout />,
    // element: <Layout isPs routes={psRoutes} />,¬
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <PsDashboardPage />,
        errorElement: <ErrorBoundary />,
        loader: async () => {
          const orders = await queryClient.fetchQuery({queryKey: ['orders'], queryFn: fetchOrders});
          return { orders };
        },
      },
      {
        path: "order-history",
        element: <OrderHistory />,
        errorElement: <ErrorBoundary />,
        loader: async () => {
          const orders = await queryClient.fetchQuery({queryKey: ['orders'], queryFn: fetchOrders});
          return { orders };
        },
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

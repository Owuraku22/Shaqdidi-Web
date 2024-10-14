import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '@/components/nsp/layout';
import Home from '@/routes/home';
import PermanentStaff from '@/routes/permanent-staff';
import Profile from '@/routes/profile';
import { fetchTodayOrders, fetchPreviousOrders, fetchStaffMembers, fetchUserProfile } from '@/lib/api';
import ErrorBoundary from './error-page';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
      {
        path: 'permanent-staff',
        element: <PermanentStaff />,
        errorElement: <ErrorBoundary />,
        loader: async () => {
          return queryClient.fetchQuery({queryKey: ['staffMembers'], queryFn: () => fetchStaffMembers()});
        },
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <ErrorBoundary />,
        loader: async () => {
          return queryClient.fetchQuery({queryKey: ['userProfile'], queryFn: fetchUserProfile});
        },
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
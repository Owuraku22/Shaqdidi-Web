import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/nsp/layout";
import PsLayout from "@/components/permanent-staff-dashboard/layout";
import Home from "@/routes/home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  fetchAvailablePersonnels,
  fetchFoodJoints,
  fetchOrders,
  FoodJoint,
  Personnel,
  signIn,
} from "@/lib/api";
import ErrorBoundary from "./error-page";
import OrderHistory from "./components/permanent-staff-dashboard/order-history";
import Regiter from "./routes/register";
import Login from "./routes/login";
import { Toaster } from "./components/ui/toaster";
import PsDashboardPage from "./components/permanent-staff-dashboard/permanent-staff-dashboard";
import { string } from "zod";
import {
  handleCreateOrder,
  handleSignInAction,
  handleSignUpAction,
} from "./lib/actions";
import { request } from "http";
import { useEffect } from "react";
import { useStoreData } from "./store/state";
import { ProtectedRoute } from "./components/protected-route";
import PersonnelError from "./personnel-error";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const nspRoutes = [{ path: "/nsp", label: "Home" }];

const psRoutes = [
  { path: "/ps", label: "Home" },
  { path: "/ps/order-history", label: "Order History" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorBoundary />,
    action: async ({ request }) => {
      return await handleSignInAction(request);
    },
  },
  {
    path: "/sign-up",
    element: <Regiter />,
    errorElement: <ErrorBoundary />,
    action: async ({ request }) => {
      return await handleSignUpAction(request);
    },
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/nsp",
        element: <Layout routes={nspRoutes} />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <Home />,
            errorElement: <ErrorBoundary />,
            // loader: async () => {
            //   const orders = await queryClient.fetchQuery({
            //     queryKey: ["orders"],
            //     queryFn: fetchOrders,
            //   });
            //   console.log("orders", orders);
            //   return { orders: orders};
            // },
          },
        ],
      },

      {
        path: "/ps",
        element: <PsLayout />,
        // element: <Layout isPs routes={psRoutes} />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            index: true,
            element: <PsDashboardPage />,
            errorElement: <PersonnelError />,
            loader: async () => {
              const foodJoints = await queryClient.fetchQuery({
                queryKey: ["foodjoint"],
                queryFn: fetchFoodJoints,
              });
              const personnel = await queryClient.fetchQuery({
                queryKey: ["personnel"],
                queryFn: fetchAvailablePersonnels,
              });
              return { foodJoints, personnel };
            },
          },
          {
            path: "order-history",
            element: <OrderHistory />,
            errorElement: <ErrorBoundary />,
            action: async ({ request }) => {
              return await handleCreateOrder(request);
            },

            loader: async () => {
              const orders = await queryClient.fetchQuery({
                queryKey: ["orders"],
                queryFn: fetchOrders,
              });
              return { orders };
            },
          },
        ],
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/components/nsp/layout";
import PsLayout from "@/components/permanent-staff-dashboard/layout";
import Home from "@/routes/home";
<<<<<<< HEAD
import {
<<<<<<< HEAD
<<<<<<< HEAD
  api,
=======
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
=======
>>>>>>> bad93d4 (Created logic fetching food Joints and posting data login and sign up pages)
  fetchAvailablePersonnels,
  fetchFoodJoints,
  fetchOrders,
  signIn,
} from "@/lib/api";
=======
import { fetchTodayOrders, fetchPreviousOrders } from "@/lib/api";
>>>>>>> 2a816a8 (Changes to layouts of food others)
import ErrorBoundary from "./error-page";
import OrderHistory from "./components/permanent-staff-dashboard/order-history";
import Regiter from "./routes/register";
import Login from "./routes/login";
import { Toaster } from "./components/ui/toaster";
import PsDashboardPage from "./components/permanent-staff-dashboard/permanent-staff-dashboard";
<<<<<<< HEAD
<<<<<<< HEAD
import { string } from "zod";
=======
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
=======
>>>>>>> bad93d4 (Created logic fetching food Joints and posting data login and sign up pages)
import {
  handleCreateOrder,
  handleSignInAction,
  handleSignUpAction,
} from "./lib/actions";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 303b43d (created and added firebase cloud messaging capabilities and altered the zustand middleware)
import { request } from "http";
import { useEffect } from "react";
import { useStoreData } from "./store/state";
import { ProtectedRoute } from "./components/protected-route";
<<<<<<< HEAD
=======
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
=======
>>>>>>> bad93d4 (Created logic fetching food Joints and posting data login and sign up pages)
=======
>>>>>>> 303b43d (created and added firebase cloud messaging capabilities and altered the zustand middleware)

const queryClient = new QueryClient();

const nspRoutes = [{ path: "/nsp", label: "Home" }];

const psRoutes = [
  { path: "/ps", label: "Home" },
  { path: "/ps/order-history", label: "Order History" },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
<<<<<<< HEAD
=======
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
  // {
  //   path: "/sign-in",
  //   element: <Login />,
  //   errorElement: <ErrorBoundary />,
  // },
  {
<<<<<<< HEAD
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
  // {
  //   path: "/sign-in",
  //   element: <Login />,
  //   errorElement: <ErrorBoundary />,
  // },
  {
    path: "/nsp",
    element: <Layout routes={nspRoutes} />,
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
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
  // {
  //   path: "/sign-in",
  //   element: <Login />,
  //   errorElement: <ErrorBoundary />,
  // },
  {
=======
>>>>>>> 303b43d (created and added firebase cloud messaging capabilities and altered the zustand middleware)
    element: <ProtectedRoute />,
    children: [
      {
        path: "/nsp",
        element: <Layout routes={nspRoutes} />,
        errorElement: <ErrorBoundary />,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 303b43d (created and added firebase cloud messaging capabilities and altered the zustand middleware)
        children: [
          {
            index: true,
            element: <Home />,
            errorElement: <ErrorBoundary />,
            loader: async () => {
              const orders = await queryClient.fetchQuery({
                queryKey: ["orders"],
                queryFn: fetchOrders,
              });
              console.log("orders", orders);
              return { orders };
            },
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
            errorElement: <ErrorBoundary />,
            loader: async () => {
              const foodJoints = await queryClient.fetchQuery({
                queryKey: ["orders"],
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
<<<<<<< HEAD
=======
        loader: async () => {
          const orders = await queryClient.fetchQuery({
            queryKey: ["orders"],
            queryFn: fetchOrders,
          });
          console.log("orders", orders);
          return { orders };
        },
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
      },
    ],
    errorElement: <ErrorBoundary />,
  },
<<<<<<< HEAD
  
=======

  {
    path: "/ps",
    element: <PsLayout />,
    // element: <Layout isPs routes={psRoutes} />,
=======
      },
    ],
>>>>>>> 303b43d (created and added firebase cloud messaging capabilities and altered the zustand middleware)
    errorElement: <ErrorBoundary />,
  },
<<<<<<< HEAD
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
=======
  
>>>>>>> 303b43d (created and added firebase cloud messaging capabilities and altered the zustand middleware)
]);

export default function App() {
  // useEffect(() => {
  //   api.interceptors.request.use(
  //     (config) => {
  //       // Retrieve the token from the Zustand store
  //       const { user } = useStoreData.getState();
  //       const token = user.authorization.token;
  //       console.log(token);

  //       if (token) {
  //         config.headers.Authorization = `Bearer ${token}`;
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       // Handle request error
  //       return Promise.reject(error);
  //     }
  //   );
  // }, [useStoreData.getState()]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

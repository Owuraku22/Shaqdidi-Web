import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import Root from "./routes/root";
import ErrorPage from "./error-page";
// import Login from "./routes/login";
import { Toaster } from "./components/ui/toaster";
import Regiter from "./routes/register";
import PsDashboard from "./components/permanent-staff-dashboard/ps-dashboard";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Layout from "./routes/layout";
import Dashboard from "./routes/dashboard";
import OrderHistory from "./routes/order-history";
import NSPs from "./routes/nsps";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Root />,
  //   errorElement: <ErrorPage />,
  // },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "nsps",
        element: <NSPs />,
      },
    ]
  },
  {
    path: "/register",
    element: <Regiter />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ps-dashboard",
    element: <PsDashboard />,
    errorElement: <ErrorPage />,
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// import Root from "./routes/root";
import ErrorPage from "./error-page";
// import Login from "./routes/login";
import { Toaster } from "./components/ui/toaster";
import Regiter from "./routes/register";
import Layout from "./routes/layout";
import Dashboard from "./routes/dashboard";
import NSPs from "./routes/nsps";
import OrderHistory from "./routes/order-history";

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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);

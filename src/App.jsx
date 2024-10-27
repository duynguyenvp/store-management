import React, { useEffect } from "react";
import loadable from "@loadable/component";
import { Skeleton } from "antd";
import MainLayout from "layouts/MainLayout";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "pages/ErrorPage";
import Test from "pages/Test";
import Login from "pages/login";
import AuthLayout from "layouts/AuthLayout";
import Register from "pages/register";
import useAuthentication from "hooks/useAuthentication";
import { ProtectedRoute } from "routes/ProtectedRoute";
import { UnProtectedRoute } from "routes/UnProtectedRoute";

const Loading = () => <Skeleton active />;
const LoadableAccountComponent = loadable(() => import("pages/Test"), {
  fallback: <Loading />
});
const LoadableServiceComponent = loadable(() => import("pages/Test"), {
  fallback: <Loading />
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/personal-info",
          element: <Test />
        },
        {
          path: "/resume",
          element: <LoadableAccountComponent />
        },
        {
          path: "/service",
          element: <LoadableServiceComponent />
        }
      ]
    },
    {
      path: "/auth",
      element: (
        <UnProtectedRoute>
          <AuthLayout />
        </UnProtectedRoute>
      ),
      children: [
        {
          path: "/auth/login",
          element: <Login />
        },
        {
          path: "/auth/register",
          element: <Register />
        }
      ]
    }
  ]);

  useAuthentication();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

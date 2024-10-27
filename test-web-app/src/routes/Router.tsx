import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "../screens/auth/RegisterPage";
import SuccessPage from "../screens/auth/SuccessPage";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../screens/home/HomePage";
import LoginPage from "../screens/auth/LoginPage";
import UpdateAccountPage from "../screens/account/UpdateAccountPage";
import ProtectedPage from "../components/auth/ProtectedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedPage isProtected={true} />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/success",
            element: <SuccessPage />,
          },
          {
            path: "/update-account",
            element: <UpdateAccountPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedPage isProtected={false} />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

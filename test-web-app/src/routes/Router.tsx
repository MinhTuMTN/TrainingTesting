import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "../screens/auth/RegisterPage";
import SuccessPage from "../screens/auth/SuccessPage";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../screens/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
    ],
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;

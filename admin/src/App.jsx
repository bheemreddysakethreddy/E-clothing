import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import AdminLayout from "./layout/AdminLayout";
import AdminProtected from "./utils/AdminProtected";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    element: <AdminProtected />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/", element: <Products /> },
          { path: "/products", element: <Products /> },
          { path: "/products/add", element: <AddProduct /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

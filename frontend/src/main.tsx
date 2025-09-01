import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Sidebar from "./components/Sidebar.tsx";
// import ProtectedRoutes from "./components/ProctedRoutes.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          // <ProtectedRoutes>
          <Dashboard />
          // </ProtectedRoutes>
        ),
      },
      {
        path: "/sidebar",
        element: (
          // <ProtectedRoutes>
          <Sidebar />
          // </ProtectedRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

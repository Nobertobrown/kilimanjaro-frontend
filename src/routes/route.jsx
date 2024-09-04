import { lazy, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import("../pages/user/Home"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const RegisterBus = lazy(() => import("../pages/admin/RegisterBus"));
const RegisterRoute = lazy(() => import("../pages/admin/RegisterRoute"));
const ManageBuses = lazy(() => import("../pages/admin/ManageBuses"));
const ManageRoutes = lazy(() => import("../pages/admin/ManageRoutes"));
const Trips = lazy(() => import("../pages/user/Trips"));
const Contact = lazy(() => import("../pages/user/Contact"));
const Booking = lazy(() => import("../pages/admin/Booking"));
const SignIn = lazy(() => import("../pages/auth/Login"));
const Payment = lazy(() => import("../pages/user/Payment"));

const pagesData = [
  {
    path: "/",
    element: <Home />,
    id: 1,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    id: 2,
    requiresAuth: true,
  },
  {
    path: "/contact",
    element: <Contact />,
    id: 3,
  },
  // {
  //   path: "/sign-up",
  //   element: <SignUp />,
  //   id: 4,
  // },
  {
    path: "/sign-in",
    element: <SignIn />,
    id: 5,
  },
  {
    path: "/trips",
    element: <Trips />,
    id: 6,
  },
  {
    path: "/bookings",
    element: <Booking />,
    id: 7,
  },
  {
    path: "/register",
    element: <RegisterBus />,
    id: 8,
    requiresAuth: true,
  },
  {
    path: "/manage",
    element: <ManageBuses />,
    id: 9,
    requiresAuth: true,
  },
  {
    path: "/:busId/register",
    element: <RegisterRoute />,
    id: 10,
    requiresAuth: true,
  },
  {
    path: "/:bus/manage",
    element: <ManageRoutes />,
    id: 11,
    requiresAuth: true,
  },
  {
    path: "/payment",
    element: <Payment />,
    id: 12,
  },
];

const Router = () => {
  const memoizedPagesData = useMemo(() => pagesData, []);

  return (
    <Routes>
      {memoizedPagesData.map(({ path, id, element, requiresAuth }) => (
        <Route
          key={id}
          path={path}
          element={
            <PrivateRoute
              element={element}
              requiresAuth={requiresAuth}
              path={path}
            />
          }
        />
      ))}
    </Routes>
  );
};

export default Router;

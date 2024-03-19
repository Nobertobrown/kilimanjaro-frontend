import { lazy, memo } from "react";
// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RegisterRoute from "../pages/admin/RegisterRoute";

const Home = lazy(() => import("../pages/user/Home"));
const RegisterBus = lazy(() => import("../pages/admin/RegisterBus"));
const ManageBuses = lazy(() => import("../pages/admin/ManageBuses"));
const ManageRoutes = lazy(() => import("../pages/admin/ManageRoutes"));
const Trips = lazy(() => import("../pages/user/Trips"));
const Contact = lazy(() => import("../pages/user/Contact"));
// const Booking = lazy(() => import("../pages/Booking"));
// const SignUp = lazy(() => import("../pages/SignUp"));
// const SignIn = lazy(() => import("../pages/SignIn"));
const Payment = lazy(() => import("../pages/user/Payment"));

const pagesData = [
  {
    path: "/",
    element: <Home />,
    id: 1,
  },
  {
    path: "/contact",
    element: <Contact />,
    id: 2,
  },
  // {
  //   path: "/sign-up",
  //   element: <SignUp />,
  //   id: 3,
  // },
  // {
  //   path: "/sign-in",
  //   element: <SignIn />,
  //   id: 4,
  // },
  {
    path: "/trips",
    element: <Trips />,
    id: 5,
  },
  // {
  //   path: "/bookings",
  //   element: <Booking />,
  //   id: 6,
  //   requiresAuth: true,
  // },
  {
    path: "/register-bus",
    element: <RegisterBus />,
    id: 7,
    requiresAuth: true,
  },
  {
    path: "/manage-buses",
    element: <ManageBuses />,
    id: 8,
    requiresAuth: true,
  },
  {
    path: "/:busId/register-route",
    element: <RegisterRoute />,
    id: 9,
    requiresAuth: true,
  },
  {
    path: "/:bus/manage-routes",
    element: <ManageRoutes />,
    id: 10,
    requiresAuth: true,
  },
  {
    path: "/payment",
    element: <Payment />,
    id: 11,
    requiresAuth: true,
  },
];

const PrivateRoute = memo(({ element }) => {
  //, requiresAuth, path
  // const { user } = useSelector((state) => state.reducer);

  // if (requiresAuth && !user.uid) {
  //   return <Navigate to="/sign-in" />;
  // }

  // if ((path === "/sign-in" || path === "/sign-up") && user.uid) {
  //   return <Navigate to="/" />;
  // }

  return element;
});

PrivateRoute.displayName = "PrivateRoute";

const Router = () => {
  return (
    <Routes>
      {pagesData.map(({ path, id, element, requiresAuth }) => (
        <Route
          key={id}
          path={path}
          element={
            <PrivateRoute
              element={element}
              requiresAuth={requiresAuth}
              path={path}
              id={id}
            />
          }
        />
      ))}
    </Routes>
  );
};

export default Router;

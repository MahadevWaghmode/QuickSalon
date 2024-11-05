import Dashboard from "./pages/Dashboard/Dashboard";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Support from "./pages/Support/Support";
import Salon from "./pages/Salons/Salon";
import Service from "./pages/Services/Service";
import Employee from "./pages/SalonStaff/Employee";
import Appointment from "./pages/Appointments/Appointment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import UserProvider from "./context/UserProvider";
import SalonProfile from "./pages/SalonProfile";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/salon",
    element: <Salon />,
  },
  {
    path: "/service",
    element: <Service />,
  },
  {
    path: "/salon_staff",
    element: <Employee />,
  },
  {
    path: "/appointments",
    element: <Appointment />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    // <>
    //   <RouterProvider router={router} />
    // </>
    <UserProvider>
      {/* <RouterProvider  router={router} /> */}

      <BrowserRouter>
        {/* public routes */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* private routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="salon" element={<Salon />} />
            <Route path="service" element={<Service />} />
            <Route path="salon_staff" element={<Employee />} />
            <Route path="appointments" element={<Appointment />} />
            <Route path="support" element={<Support />} />
            <Route path="salon/:salonId" element={<SalonProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EmployeeEntry from "./pages/employee-entry";
import Home from "./Home";
import EmployeeQuery from "./pages/employee-query";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: () => ({ message: "Hello Data Router!" }),
      Component() {
        return <Home />;
      },
    },
    {
      path: "/employee-entry",
      loader: () => ({ message: "hold up... loading employee entry" }),
      Component() {
        return <EmployeeEntry />;
      },
    },
    {
      path: "/employee-query",
      loader: () => ({ message: "hold up... loading employee entry" }),
      Component() {
        return <EmployeeQuery />;
      },
    },
  ]);
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  )
}

export default App

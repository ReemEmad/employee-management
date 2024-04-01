import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeEntry from "./pages/employee-entry";
import Home from "./Home";
import EmployeeQuery from "./pages/employee-query";
import EditEmployee from "./pages/employee-entry/edit";
import AppMenu from "./components/AppMenu";
import { Container } from "@mui/material";

function App() {
  const router = createBrowserRouter([
    {
      // errorElement: <p>Something is wrong!</p>,
      children: [
        {
          path: "/",
          loader: () => ({ message: "Hello Data Router!" }),
          Component() {
            return (
              <>
                <AppMenu />
                <Container maxWidth="xl">
                  <Home />
                </Container>
              </>
            );
          },
        },
        {
          path: "/employee-entry",
          loader: () => ({ message: "hold up... loading employee entry" }),
          Component() {
            return (
              <>
                <AppMenu />
                <Container maxWidth="xl">
                  <EmployeeEntry />
                </Container>
              </>
            );
          },
        },
        {
          path: "/employee-entry/edit/:id",
          loader: () => ({ message: "hold up... loading employee entry" }),
          Component() {
            return (
              <>
                <Container maxWidth="xl">
                  <AppMenu />
                  <EditEmployee />
                </Container>
              </>
            );
          },
        },
        {
          path: "/employee-query",
          loader: () => ({ message: "hold up... loading employee entry" }),
          Component() {
            return (
              <>
                <AppMenu />
                <Container maxWidth="xl">
                  <EmployeeQuery />
                </Container>
              </>
            );
          },
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;

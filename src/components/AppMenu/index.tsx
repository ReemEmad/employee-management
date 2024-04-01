import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import src from "../../assets/logo-no-background.svg";
import { useLocation } from "react-router-dom";
const pages = [
  { name: "Home", link: "/" },
  { name: "Entry", link: "/employee-entry" },
  { name: "Query", link: "/employee-query" },
];

function AppMenu() {
  const { pathname } = useLocation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <img src={src} alt="logo" width="64" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to={page.link}>
                <Button
                  key={page.name}
                  sx={{
                    my: 2,
                    color: pathname === page.link ? "#f9a826" : "white",
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppMenu;

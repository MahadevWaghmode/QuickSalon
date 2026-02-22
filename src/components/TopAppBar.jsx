import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Stack,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

function TopAppBar() {
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Sign In", path: "/login" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          {/* ===== BRAND ===== */}
          <Typography
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.3rem", md: "1.6rem" },
              textDecoration: "none",
              color: "secondary.main",
              letterSpacing: 0.5,
            }}
          >
            QuickSalon
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* ===== NAVIGATION ===== */}
          <Stack direction="row" spacing={2} alignItems="center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Button
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    textTransform: "none",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "secondary.main" : "text.primary",
                    position: "relative",
                    "&::after": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: -4,
                          height: "2px",
                          backgroundColor: "secondary.main",
                          borderRadius: 2,
                        }
                      : {},
                  }}
                >
                  {link.label}
                </Button>
              );
            })}

            {/* CTA Button */}
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: "999px",
                px: 3,
                textTransform: "none",
                boxShadow: 2,
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopAppBar;
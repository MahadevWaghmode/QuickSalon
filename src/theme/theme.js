// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true, // ✅ MUI v7 feature
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#8a4248", // royal purple
        },
        secondary: {
          main: "#EC4899", // salon pink
        },
        background: {
          default: "#F9FAFB",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#111827",
          secondary: "#6B7280",
        },
        success: { main: "#22C55E" },
        warning: { main: "#F59E0B" },
        error: { main: "#EF4444" },
      },
    },
  },

  typography: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.5rem", fontWeight: 600 },
    h3: { fontSize: "1.25rem", fontWeight: 500 },
    body1: { fontSize: "0.95rem" },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 4,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 20px",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#111827",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none",
          boxShadow: "4px 0 20px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;

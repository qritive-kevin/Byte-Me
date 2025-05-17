import {
  createTheme,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    light: PaletteColor;
    dark: PaletteColor;
  }

  interface PaletteOptions {
    light?: PaletteColorOptions;
    dark?: PaletteColorOptions;
  }
}

const albertFont = "Albert Sans, sans-serif";
const nunitoFont = "Nunito Sans, sans-serif";

// Function to create a theme based on the mode
const getTheme = (mode: any) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: "#fff",
        paper: "#F5F5F5",
      },
      primary: {
        main: mode === "light" ? "#0042DC" : "#0042DC", // Blue for both mode
        light: "#DFF3FF", //sky blue
        dark: "#6D4C41",
        contrastText: mode === "light" ? "#FFFFFF" : "#333333", // White text on primary color in light mode, dark text in dark mode
      },
      secondary: {
        main: mode === "light" ? "#f7f3f0" : "#676767", // Light grey for light mode, grey for dark mode
        light: "#FFD700",
        dark: "#8c8a88",
        contrastText: "#FFFFFF", // White text on secondary color
      },
      light: {
        main: "#F5F3EF", // Main light background color (white background color)
        light: "#FFFFFF",
        dark: "#EDE7E0",
      },
      dark: {
        main: "#000", //Black color
        light: "#514c4b",
        dark: "light.main",
      },
      error: {
        main: "#f44336", // Red for errors
        light: "#e57373",
        dark: "#d32f2f",
      },
      warning: {
        main: "#ff9800", // Orange for warnings
        light: "#ffb74d",
        dark: "#f57c00",
      },
      info: {
        main: "#2196f3",
        light: "#64b5f6",
        dark: "#1976d2",
      },
      success: {
        main: "#4caf50", // Green for successes
        light: "#81c784",
        dark: "#388e3c",
      },
    },
    typography: {
      fontFamily: nunitoFont,
      h1: { fontFamily: albertFont },
      h2: { fontFamily: albertFont },
      h3: { fontFamily: albertFont },
      h4: { fontFamily: albertFont },
      h5: { fontFamily: albertFont },
      h6: { fontFamily: albertFont },
      subtitle1: { fontFamily: albertFont },
      button: { fontFamily: nunitoFont },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          // elevation: 2,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.default,
            padding: 20,
            "&.table-paper": {
              boxShadow: "none",
              borderRadius: 0,
            },
          }),
          rounded: {
            borderRadius: "20px",
          },
          outlined: {
            borderColor: "#bdbdbd",
          },
        },
      },

      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            border: "1px solid #444",
            borderRadius: "4px",
            background: "linear-gradient(45deg, #434343 0%, #000 100%)",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: "#fff",
            border: "none",
            "&.Mui-selected": {
              backgroundColor: "#555",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#444",
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
        },
        styleOverrides: {
          contained: {
            background: "#0042DC",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "50px",
            "&:hover": {
              background: "#0036C0",
            },
            "&:focus": {
              background: "#0052FF",
            },
          },
          outlined: {
            background: "transparent",
            border: "1px solid #0042DC",
            color: "#0042DC",
            fontWeight: "bold",
            borderRadius: "15px",
            padding: "8px 32px",
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              background: "transparent",
              border: "1px solid #0036C0",
              color: "#0036C0",
            },
            "&:focus": {
              background: "transparent",
              border: "1px solid #0052FF",
              color: "#0052FF",
            },
          },
          text: {
            background: "#F5F3EF",
            color: "#e2994f",
            border: "1px solid error.main",
            borderRadius: "4px",
            "&:hover": {
              background: "#F5F3EF",
            },
            "&:focus": {
              background: "#F5F3EF",
            },
          },
          root: {
            background: "#e2994f",
            color: "#F5F3EF",
            borderRadius: "50px",
            p: "10px",
            "&:hover": {
              background: "#c17d39",
            },
            "&.Mui-disabled": {
              color: "#666",
              background: "#333333",
            },
            "&.MuiButton-sizeSmall": {
              padding: "6px 28px",
              fontWeight: 900,
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.default,
            padding: "24px",
            borderRadius: "16px",
            height: "100%",
          }),
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            padding: 0,
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            padding: 0,
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        },
        styleOverrides: {
          root: ({ ownerState }) => ({
            backgroundColor:
              ownerState.variant === "outlined" ? "#fff" : "#f5f5f5",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#fff",
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
              "&:hover fieldset": {
                borderColor: "#c0c0c0",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0042DC",
              },
            },
          }),
        },
      },

      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#000000", // default for all variants
          },
          caption: ({ theme }) => ({
            color: theme.palette.grey[600],
            borderColor: theme.palette.divider,
          }),
        },
      },
    },
  });

export default getTheme;

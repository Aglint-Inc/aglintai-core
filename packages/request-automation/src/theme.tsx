// src/theme.js
import { createTheme } from "@mui/material/styles";

// Create a theme with size small for all components
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiFab: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTab: {
      defaultProps: {
        // size: "small",
      },
    },
    // Add other components as needed
  },
});

export default theme;

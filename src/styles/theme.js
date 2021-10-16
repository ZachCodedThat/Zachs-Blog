import { theme as chakraTheme, extendTheme } from "@chakra-ui/react";
// import useKeyboardNav from "";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  ...chakraTheme.fonts,
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  fontWeights: {
    normal: 300,
    medium: 600,
    bold: 700,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "70em",
});

const colors = {
  primary: "#FFECD1",
  secondary: "#001524",
  highlightLight: "#15616D",
  hightlightDark: "#FFECD1",
  backgroundLight: "#FFECD1",
  backgroundDark: "#001524",
  textLight: "#001524",
  textDark: "#FFECD1",
  accentColor: "#15616D",
};

// const shadows = {
//   outline: isKeyboardNavigating ? theme.shadows.outline : "none",
// };

const overrides = {
  ...chakraTheme,
  fonts,
  colors,
  breakpoints,
  // shadows,
};

const Button = {
  // Styles for the base style
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base",
    cursor: "pointer",
    // <-- border radius is same for all variants and sizes
  },

  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 4,
      margin: 0.5,
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "purple.500",
      color: "purple.500",
    },
    solid: {
      bg: "purple.500",
      color: "white",
    },
    nav: {
      px: 6,
      py: 4,
      margin: 1,
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};

const customTheme = extendTheme(overrides, {
  components: {
    Button,
  },
});

export default customTheme;

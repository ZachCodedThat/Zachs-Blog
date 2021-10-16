import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import customTheme from "@styles/theme";
import GlobalStyle from "@styles/globalStyles";
import "focus-visible/dist/focus-visible";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: "dark",
          useSystemColorMode: false,
        }}
      >
        <GlobalStyle>
          <Component {...pageProps} />
        </GlobalStyle>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

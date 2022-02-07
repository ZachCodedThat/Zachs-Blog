import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import customTheme from "@styles/theme";
import GlobalStyle from "@styles/globalStyles";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

import "focus-visible/dist/focus-visible";

/* TODO: Figure out if ColorModeProvider is being used 
        - Testing shows that it is not making a noticable difference in performance or function.
          - I will test on the portfolio page and see if there is any noticable difference.
          - for now I will leave it in. 
*/

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: "dark",
          useSystemColorMode: false,
        }}
      >
        <GlobalStyle>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </GlobalStyle>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

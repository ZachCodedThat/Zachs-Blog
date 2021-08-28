import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
  useToken,
} from "@chakra-ui/react";
import customTheme from "@styles/theme";
import { Global, css } from "@emotion/react";

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  const [primary, highlight] = useToken("colors", ["primary", "highlight"]);

  return (
    <>
      <Global
        styles={css`
          ::selection {
            background-color: #90cdf4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            min-width: 356px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === "light" ? "white" : "#171717"};
          }
          h1 {
            font-size: 50px;
            line-height: 2;
            font-weight: bold;
            margin: 10px 0;
            color: ${colorMode === "light" ? primary : highlight}
            
          }
          ul {
            display: block;
            list-style-type: disc;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0px;
             margin-inline-end: 0px;
            padding-inline-start: 40px;
}
          p {
            font-size: 20px;
            margin: 10px 0;
          }
          blockquote {
            border-left: 2px solid #ddd;
            margin-left: 0;
            margin-right: 0;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
}

          hr {
            line-height: 2;
            color: ${colorMode === "light" ? primary : highlight}
          }

          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
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

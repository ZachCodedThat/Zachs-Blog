import { useColorMode, useToken } from "@chakra-ui/react";

import { Global, css } from "@emotion/react";

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  // useToken allows you to reach into your theme.js file which is wrapping the entire _app.js and pin the vlaues of a param
  //  in this case "colors" and allows for thier use within this component

  const [primary, secondary, backgroundLight, backgroundDark] = useToken(
    "colors",
    ["primary", "secondary", "backgroundLight", "backgroundDark"]
  );

  // provides styling to various base JSX elements. The Global tag is passed to _app.js where it is used to extend these styles across the entire application.

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
            background: ${colorMode === "light"
              ? backgroundLight
              : backgroundDark};
          }

          hr {
            line-height: 2;
            color: ${colorMode === "light" ? secondary : primary};
          }
        `}
      />
      {children}
    </>
  );
};

export default GlobalStyle;

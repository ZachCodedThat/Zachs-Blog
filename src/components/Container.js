import React from "react";
import { useColorMode, Button, Flex, Box, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import styled from "@emotion/styled";

import DarkModeSwitch from "./DarkModeSwitch";

const Container = ({ children }) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: "white",
    dark: "#171717",
  };

  const color = {
    light: "black",
    dark: "white",
  };

  const navHoverBg = {
    light: "primary",
    dark: "highlight",
  };

  const StickyNav = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
  `;

  return (
    <>
      <StickyNav bg={bgColor[colorMode]} justifyContent="space-between">
        <Box>
          <NextLink href="/" passHref>
            <Button
              size="lg"
              as="a"
              variant="ghost"
              cursor="pointer"
              _hover={{ bg: navHoverBg[colorMode], color: "black" }}
            >
              Zachs Blog
            </Button>
          </NextLink>
          <NextLink href="/postblog" passHref>
            <Button
              size="lg"
              as="a"
              variant="ghost"
              cursor="pointer"
              _hover={{ bg: navHoverBg[colorMode], color: "black" }}
            >
              Post
            </Button>
          </NextLink>
        </Box>

        <DarkModeSwitch />
      </StickyNav>

      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        px={[0, 4, 4]}
        mt={[4, 8, 8]}
      >
        {children}
      </Flex>
    </>
  );
};

export default Container;

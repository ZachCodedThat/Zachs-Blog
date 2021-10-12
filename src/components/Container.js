import React from "react";
import { useColorMode, Button, Flex, Box, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import styled from "@emotion/styled";

import DarkModeSwitch from "./DarkModeSwitch";

const Container = () => {
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
              as="a"
              color={color[colorMode]}
              variant="nav"
              _hover={{ bg: navHoverBg[colorMode], color: bgColor[colorMode] }}
            >
              Zachs Blog
            </Button>
          </NextLink>
          <NextLink href="/postblog" passHref>
            <Button
              color={color[colorMode]}
              as="a"
              variant="nav"
              _hover={{ bg: navHoverBg[colorMode], color: bgColor[colorMode] }}
            >
              Post
            </Button>
          </NextLink>
        </Box>

        <DarkModeSwitch />
      </StickyNav>
    </>
  );
};

export default Container;

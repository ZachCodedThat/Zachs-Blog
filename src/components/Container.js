import React from "react";
import { useColorMode, Button, Flex, Box, Image } from "@chakra-ui/react";
import NextLink from "next/link";
import styled from "@emotion/styled";
import { textColor, bgColor, buttonHoverColor } from "@styles/colorModeStyles";

import DarkModeSwitch from "./DarkModeSwitch";

const Container = () => {
  const { colorMode } = useColorMode();

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
              color={textColor[colorMode]}
              variant="nav"
              _hover={{
                bg: buttonHoverColor[colorMode],
                color: bgColor[colorMode],
              }}
            >
              Zachs Blog
            </Button>
          </NextLink>
          <NextLink href="/postblog" passHref>
            <Button
              color={textColor[colorMode]}
              as="a"
              variant="nav"
              _hover={{
                bg: buttonHoverColor[colorMode],
                color: bgColor[colorMode],
              }}
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

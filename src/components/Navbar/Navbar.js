import React, { useState, useEffect } from "react";
import { useColorMode, Button, Flex, Box, Fade } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

import { textColor, bgColor, buttonHoverColor } from "@styles/colorModeStyles";
// import Sidemenu from "./sideMenu";

import DarkModeSwitch from "@components/DarkModeSwitch";

const Navbar = () => {
  const [navbar, setNavbar] = useState(true);
  const { colorMode } = useColorMode();

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(false);
    } else {
      setNavbar(true);
    }
  };
  const isDev = process.env.NODE_ENV === "development";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <>
      <Flex
        position="sticky"
        zIndex={10}
        top={0}
        justifyContent="space-between"
      >
        {navbar ? (
          <>
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
              {isDev && (
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
              )}
            </Box>

            <DarkModeSwitch />
          </>
        ) : (
          <Flex>
            <Fade in={!navbar}>
              <Button
                size="lg"
                color={textColor[colorMode]}
                variant="ghost"
                _active="none"
                _hover="none"
              >
                <ChevronUpIcon w={60} h={60} onClick={scrollToTop} />
              </Button>
            </Fade>
            <DarkModeSwitch />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useColorMode } from "@chakra-ui/react";
import { textColor } from "../utils/colors";
const NotFound = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  useEffect(() => {
    SetTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      color={textColor[colorMode]}
    >
      <Heading size="2xl">Nope.404</Heading>
    </Box>
  );
};

export default NotFound;

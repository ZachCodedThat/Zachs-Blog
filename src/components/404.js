import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

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

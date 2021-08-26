import React, { useState } from "react";

import Editor from "./Editor";

import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Box,
  Link,
  Image,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [notification, setNotification] = useState("");

  const { colorMode } = useColorMode();
  const color = {
    light: "primary",
    dark: "highlight",
  };
  const navHoverBg = {
    light: "primary",
    dark: "highlight",
  };
  return (
    <Stack direction="column" minW="900px">
      <Heading color={color[colorMode]}>Add Blog</Heading>
      <Box>{notification}</Box>

      <form>
        <FormControl id="title" isRequired>
          <Box>
            <FormLabel color={color[colorMode]}>Title</FormLabel>
            <Input
              color={color[colorMode]}
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Box>
        </FormControl>

        <FormControl id="Date" isRequired>
          <Box>
            <FormLabel color={color[colorMode]}>Date</FormLabel>
            <Input
              color={color[colorMode]}
              type="date"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
          </Box>
        </FormControl>
        <FormControl isRequired>
          <Box
            bg="white"
            h="400px"
            mt={4}
            border="2px solid black"
            wrap="wrap"
            color="black"
            p={4}
          >
            <Editor />
          </Box>
        </FormControl>
        <Button
          size="lg"
          variant="ghost"
          cursor="pointer"
          _hover={{ bg: navHoverBg[colorMode], color: "black" }}
          type="submit"
        >
          Save
        </Button>
      </form>
    </Stack>
  );
};
export default CreatePost;

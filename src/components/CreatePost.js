import React, { useState } from "react";
import slugify from "@utils/slugify";

import SlateEditor from "./Editor";

// import SlateEditor from "./Editor";

import {
  useColorMode,
  useToast,
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
  // const toast = useToast(); // use the try/catch within the fetch and you need 2 one for passing and one for failing.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  const createPost = async (e) => {
    e.preventDefault();

    if (!title || !date || !body || !description) {
      return;
    }
    console.log("firing");
    await fetch("/api/blogPosts/", {
      method: "POST",
      body: JSON.stringify({
        title,
        date,
        description,
        body,
        slug: slugify(title),
      }),
    });
    console.log("firing");
  };

  // const changeScroll = () => {
  //   if (Box.h < Box.maxHeight) {
  //     Box.overflowY = "none";
  //   } else {
  //     Box.overflowY = "scroll";
  //   }
  // };

  const { colorMode } = useColorMode();
  const color = {
    light: "textLight",
    dark: "textDark",
  };
  const textColor = {
    light: "textLight",
    dark: "textDark",
  };
  const navHoverBg = {
    light: "highlightLight",
    dark: "backgroundLight",
  };
  const hoverTextColor = {
    light: "textDark",
    dark: "textLight",
  };
  const editorBg = {
    light: "backgroundLight",
    dark: "backgroundDark",
  };
  return (
    <Stack direction="column" justify="center" align="center">
      <Flex
        direction="column"
        justify="center"
        minW={[350, 600, 700, 800, 900]}
        pl={[2]}
      >
        <Heading color={color[colorMode]} mb={6}>
          Add Blog
        </Heading>

        <form onSubmit={createPost}>
          <FormControl id="title" isRequired>
            <Box>
              <FormLabel color={color[colorMode]}>Title</FormLabel>
              <Input
                border="2px solid"
                borderColor={color[colorMode]}
                color={color[colorMode]}
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Box>
          </FormControl>
          <Box>
            <FormLabel color={color[colorMode]} pt={[2, 4]}>
              Description
            </FormLabel>
            <Input
              border="2px solid"
              borderColor={color[colorMode]}
              color={color[colorMode]}
              type="text"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Box>
          <FormControl id="Date" isRequired>
            <Box>
              <FormLabel color={color[colorMode]} pt={[2, 4]}>
                Date
              </FormLabel>
              <Input
                border="2px solid"
                borderColor={color[colorMode]}
                color={color[colorMode]}
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
              />
            </Box>
          </FormControl>
          <FormControl isRequired>
            <Box
              mt={6}
              border="2px solid"
              bg={editorBg[colorMode]}
              borderColor={color[colorMode]}
              wrap="wrap"
              color={color[colorMode]}
              p={4}
              maxWidth={[400, 650, 750, 850, 1000]}
              maxHeight="400px"
              overflowY="auto"
            >
              <SlateEditor value={body} setValue={setBody} />
            </Box>
          </FormControl>
          <Button
            size="lg"
            color={textColor[colorMode]}
            variant="ghost"
            cursor="pointer"
            _hover={{
              bg: navHoverBg[colorMode],
              color: hoverTextColor[colorMode],
            }}
            type="submit"
            mt={6}
          >
            Post
          </Button>
        </form>
      </Flex>
    </Stack>
  );
};
export default CreatePost;

// this is a test for WSL git functions
// and this is a second test

import React, { useState } from "react";
import slugify from "@utils/slugify";

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
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState([
    { type: "paragraph", children: [{ text: "", marks: "" }] },
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

      <form onSubmit={createPost}>
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
        <Box>
          <FormLabel color={color[colorMode]}>Description</FormLabel>
          <Input
            color={color[colorMode]}
            type="text"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </Box>
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
            <Editor value={body} setValue={setBody} />
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

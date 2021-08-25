import React, { useState } from "react";
import fire from "src/fire-config";
import Editor from "./MarkdownEditor";

import "react-markdown-editor-lite/lib/index.css";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore().collection("blog").add({
      title: title,
      text: text,
      date: date,
    });
    console.log({
      title: title,
      text: text,
      date: date,
    });
    setTitle("");
    setText("");
    setDate("");
    setNotification("Blogpost created");
    setTimeout(() => {
      setNotification("");
    }, 4000);
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
    <Stack>
      <Heading color={color[colorMode]}>Add Blog</Heading>
      <Box>{notification}</Box>

      <form onSubmit={handleSubmit}>
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
          <FormLabel color={color[colorMode]}>Body</FormLabel>
          {/* <Input
              color={color[colorMode]}
              type="body"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            /> */}
          <Editor />
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

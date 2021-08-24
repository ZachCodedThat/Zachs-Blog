import React, { useState } from "react";
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
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      title: title,
      date: date,
      content: content,
    });
    setTitle("");
    setContent("");
    setDate("");
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
      <Heading>Add Blog</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired>
          <Box>
            <FormLabel>Title</FormLabel>
            <Input
              color={color[colorMode]}
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Box>
        </FormControl>

        <FormControl id="date" isRequired>
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
        <FormControl id="body" isRequired>
          <Box>
            <FormLabel color={color[colorMode]}>Body</FormLabel>
            <Input
              color={color[colorMode]}
              type="body"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
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

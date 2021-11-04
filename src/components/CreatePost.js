import React, { useState } from "react";
import slugify from "@utils/slugify";

import SlateEditor from "./Editor";

// import SlateEditor from "./Editor";

import {
  useColorMode,
  Heading,
  Flex,
  Box,
  Button,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import {
  textColor,
  borderColor,
  buttonTextHoverColor,
  buttonHoverColor,
  editorBg,
} from "@styles/colorModeStyles";

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

  const { colorMode } = useColorMode();

  return (
    <Stack direction="column" justify="center" align="center">
      <Flex
        direction="column"
        justify="center"
        minW={[350, 600, 700, 800, 900]}
        pl={[2]}
      >
        <Heading color={textColor[colorMode]} mb={6}>
          Add Blog
        </Heading>

        <form onSubmit={createPost}>
          <FormControl id="title" isRequired>
            <Box>
              <FormLabel color={textColor[colorMode]}>Title</FormLabel>
              <Input
                border="2px solid"
                borderColor={borderColor[colorMode]}
                color={textColor[colorMode]}
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </Box>
          </FormControl>
          <Box>
            <FormLabel color={textColor[colorMode]} pt={[2, 4]}>
              Description
            </FormLabel>
            <Input
              border="2px solid"
              borderColor={borderColor[colorMode]}
              color={textColor[colorMode]}
              type="text"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </Box>
          <FormControl id="Date" isRequired>
            <Box>
              <FormLabel color={textColor[colorMode]} pt={[2, 4]}>
                Date
              </FormLabel>
              <Input
                border="2px solid"
                borderColor={borderColor[colorMode]}
                color={textColor[colorMode]}
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
              borderColor={borderColor[colorMode]}
              wrap="wrap"
              color={textColor[colorMode]}
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
              bg: buttonHoverColor[colorMode],
              color: buttonTextHoverColor[colorMode],
            }}
            type="submit"
            mt={6}
          >
            Post
          </Button>
        </form>
        {/* <Box textAlign="center" display="flex" justifyContent="center">
          <Text color={textColor[colorMode]} verticalAlign="middle" padding={5}>
            value: {JSON.stringify(body)}
          </Text>
        </Box> */}
      </Flex>
    </Stack>
  );
};
export default CreatePost;

// this is a test for WSL git functions
// and this is a second test

import { useState } from "react";
import slugify from "@utils/slugify";

import SlateEditor from "./Editor";

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
} from "@chakra-ui/react";
import {
  textColor,
  borderColor,
  buttonTextHoverColor,
  buttonHoverColor,
  editorBg,
} from "@styles/colorModeStyles";

/* 
This Component is the main mechanism for creating a new blog post, it takes all of the necessary data and converts it to JSON and sends it to my DB.
*/

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);

  /* This function calls the handler [[...id]] API route and uses the data to create a new post. 
      - The "!" represents a required field.
  */

  const sendPost = async (e) => {
    e.preventDefault();

    if (!title || !date || !body || !description) {
      return;
    }

    await fetch("/api/blogPosts/", {
      method: "POST",
      body: JSON.stringify({
        title,
        date,
        description,
        body,
        slug: slugify(title), // This is the slug that is used to create the URL for the post by GSPaths.
      }),
    });
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

        <form onSubmit={sendPost}>
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
      </Flex>
    </Stack>
  );
};
export default CreatePost;

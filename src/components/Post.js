import NextLink from "next/link";
import {
  useColorMode,
  Button,
  Box,
  Heading,
  Text,
  Flex,
  Stack,
  Image,
} from "@chakra-ui/react";

const Post = ({ post }) => {
  const { title, description, id, image, date } = post;

  async function deletePost(id) {
    await fetch("/api/blogPosts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  }
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
    <Stack
      as="main"
      border="solid"
      borderColor={color[colorMode]}
      borderRadius="10px"
      spacing={10}
      m="0 auto 4rem auto"
      maxWidth="700px"
      px={2}
    >
      <Heading padding="10px" marginBottom="-5" color={color[colorMode]}>
        {title}
      </Heading>
      <Image src={image} alt="" borderRadius="10px" />

      <Text
        bg={color[colorMode]}
        color="black"
        as="date"
        padding="5px"
        width="100%"
      >
        Posted on {date}
      </Text>

      <Text padding="10px" fontSize="lg">
        {description}
      </Text>
      <Box>
        <NextLink href={`api/blogPosts/${id}`}>
          <Button
            size="md"
            variant="ghost"
            cursor="pointer"
            bg="none"
            marginBottom="5px"
            _hover={{ bg: navHoverBg[colorMode], color: "black" }}
            as="a"
          >
            Read More
          </Button>
        </NextLink>
        <Button
          // onClick={editPost}
          size="md"
          variant="ghost"
          cursor="pointer"
          bg="none"
          marginBottom="5px"
          _hover={{ bg: navHoverBg[colorMode], color: "black" }}
          as="a"
        >
          Edit post
        </Button>
        <Button
          onClick={() => deletePost(id)}
          size="md"
          variant="ghost"
          cursor="pointer"
          bg="none"
          marginBottom="5px"
          _hover={{ bg: navHoverBg[colorMode], color: "black" }}
          as="a"
        >
          Delete post
        </Button>
      </Box>
    </Stack>
  );
};

export default Post;

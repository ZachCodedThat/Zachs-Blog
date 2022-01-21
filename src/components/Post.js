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
import {
  textColor,
  dateTextColor,
  borderColor,
  accentColor,
  buttonTextHoverColor,
  buttonHoverColor,
} from "@styles/colorModeStyles";
const Post = ({ posts }) => {
  const { title, date, description, id, slug, image } = posts;

  async function deletePost(id) {
    await fetch("/api/blogPosts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
  }
  const isDev = process.env.NODE_ENV === "development";

  const { colorMode } = useColorMode();

  return (
    <Stack
      as="main"
      border="solid"
      borderColor={borderColor[colorMode]}
      borderRadius="10px"
      spacing={10}
      m="0 auto 4rem auto"
      maxWidth="700px"
      px={2}
    >
      <Heading padding="10px" marginBottom="-5" color={textColor[colorMode]}>
        {title}
      </Heading>
      <Image srcSet={image} alt="" borderRadius="10px" />

      <Text
        bg={accentColor[colorMode]}
        color={dateTextColor[colorMode]}
        padding="5px"
        width="100%"
      >
        Posted on {date}
      </Text>

      <Text padding="10px" fontSize="lg" color={textColor[colorMode]}>
        {description}
      </Text>
      <Box justifyContent="space-between">
        <NextLink href={`/blog/${slug}`}>
          <Button
            variant="ghost"
            color={textColor[colorMode]}
            marginBottom="5px"
            as="a"
            _hover={{
              bg: buttonHoverColor[colorMode],
              color: buttonTextHoverColor[colorMode],
            }}
          >
            Read More
          </Button>
        </NextLink>
        {isDev && (
          <Button
            onClick={() => deletePost(id)}
            color={textColor[colorMode]}
            variant="ghost"
            marginBottom="5px"
            _hover={{
              bg: buttonHoverColor[colorMode],
              color: buttonTextHoverColor[colorMode],
            }}
            as="a"
          >
            Delete post
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default Post;

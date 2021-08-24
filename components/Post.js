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
        {post.frontmatter.title}
      </Heading>
      <Image src={post.frontmatter.cover_image} alt="" borderRadius="10px" />

      <Text
        bg={color[colorMode]}
        color="black"
        as="date"
        padding="5px"
        width="100%"
      >
        Posted on {post.frontmatter.date}
      </Text>

      <Text padding="10px" fontSize="lg">
        {post.frontmatter.excerpt}
      </Text>
      <Box>
        <NextLink href={`/blog/${post.slug}`}>
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
      </Box>
    </Stack>
  );
};

export default Post;

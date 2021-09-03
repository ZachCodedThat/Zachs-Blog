import supabase from "@utils/initSupabase";
import NextLink from "next/link";
import Container from "@components/Container";
import serialize from "@utils/serializeSlateToJsx";

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
} from "@chakra-ui/react";

export default function PostPage({ posts }) {
  const { title, image, date, body, id } = posts;

  const { colorMode } = useColorMode();
  const color = {
    light: "primary",
    dark: "highlight",
  };
  const navHoverBg = {
    light: "primary",
    dark: "highlight",
  };
  // console.log(posts);
  // console.log(serialize(body[0]));
  return (
    <Container>
      <Stack
        as="main"
        borderRadius="10px"
        spacing={7}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="100%"
        px={2}
      >
        <NextLink href="/">
          <Box>
            <Button
              size="md"
              variant="ghost"
              cursor="pointer"
              marginBottom="5px"
              _hover={{ bg: navHoverBg[colorMode], color: "black" }}
              as="a"
            >
              Back
            </Button>
          </Box>
        </NextLink>
        <Flex className="card card-page">
          <Heading fontSize="6xl">{title} </Heading>
        </Flex>
        <Text
          bg={color[colorMode]}
          color="black"
          as="date"
          padding="5px"
          width="100%"
          fontSize="xl"
        >
          Posted on {date}
        </Text>

        <Image
          src={image}
          alt=""
          padding="10px"
          width="80%"
          alignSelf="center"
        />

        <Flex
          as="post-body"
          width="100%"
          align="flex-start"
          justifyContent="space-between"
          flexDirection={["column", "row"]}
        >
          {serialize(body[2])}
        </Flex>
      </Stack>
    </Container>
  );
}

export async function getStaticPaths() {
  const { data } = await supabase.from("blogPosts").select();
  const posts = data;
  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const postSlug = slug;
  const { data } = await supabase
    .from("blogPosts")
    .select()
    .match({ slug: postSlug });
  const post = data[0];

  if (!post) {
    console.warn(`No content found for slug ${postSlug}`);
  }

  return {
    props: {
      posts: post,
    },
    revalidate: 10,
  };
}

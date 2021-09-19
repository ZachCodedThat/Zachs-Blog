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

// post is passed from GSprops and is destructured to make it easier to work with within the JSX.

// body is the only complicated use case. Since it returns as an array of objects we need to map it through the Searilize function.

export default function PostPage({ post }) {
  const { title, image, date, body, id } = post;

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
          {body.map((node) => serialize(node))}
        </Flex>
      </Stack>
    </Container>
  );
}

// GSPaths is used to create dynamic routes for each of the blog posts within the database. This is completed by mapping across all of the slugs in the DB
//  and creating a path for each one.

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

//GSProps is used to pull all of the data from the post specified from the DB using the Slug param from GSpaths as a reference.

//The data is a an object containing the key:value data from the post matched the slug.

//Though this is a static function running revalidate as the second argument allows us to update the data on the page after it has been udated on the DB.

export async function getStaticProps({ params: { slug } }) {
  const postSlug = slug;
  const { data } = await supabase
    .from("blogPosts")
    .select()
    .match({ slug: postSlug });
  const post = data[0];
  // console.log(data[0]);
  if (!post) {
    console.warn(`No content found for slug ${postSlug}`);
  }

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

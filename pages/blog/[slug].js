import supabase from "@utils/initSupabase";
import Navbar from "@components/Navbar";
import Serialize from "@utils/serializeSlateToJsx";
import { NextSeo } from "next-seo";

import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Box,
  Image,
  Stack,
} from "@chakra-ui/react";
import { accentColor, dateTextColor, textColor } from "@styles/colorModeStyles";

/* 
This component is used to display a single blog post.

The Individual post data is passed from GSprops and is destructured to make it easier to work with within the JSX.
  body is the only complicated use case. Since it returns as an array of objects we need to map through it using a Searilize function. 
  -src/utils/serializeSlateToJsx. 
 
 */

export default function PostPage({ post }) {
  const { title, date, body, slug, description, image } = post;

  const { colorMode } = useColorMode();

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: `https://www.zacharyp.blog/blog/${slug}`,
          images: [
            {
              url: `${image}`,
              alt: `splash image for ${title}`,
              type: "image/png",
            },
          ],
        }}
      />
      <Navbar />
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
        <Flex>
          <Heading
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", xl: "6xl" }}
            color={textColor[colorMode]}
          >
            {title}{" "}
          </Heading>
        </Flex>
        <Text
          bg={accentColor[colorMode]}
          color={dateTextColor[colorMode]}
          as="date"
          padding="5px"
          width="100%"
          fontSize="xl"
        >
          Posted on {date}
        </Text>

        <Box
          as="post-body"
          sp
          align="flex-start"
          justifyContent="space-between"
          flexDirection={["column", "row"]}
        >
          {body.map((node) => Serialize(node))}
        </Box>
      </Stack>
    </>
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

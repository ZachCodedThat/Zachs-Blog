import Post from "@components/Post";
import { NextSeo } from "next-seo";

import { sortByID } from "@utils/sortByID";
import Navbar from "@components/Navbar";
import { Flex, Box, useColorMode, Stack } from "@chakra-ui/react";
import supabase from "@utils/initSupabase";
import { bgColor } from "@styles/colorModeStyles";

const Home = ({ posts }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <NextSeo
        title="Welcome to my blog!"
        description="This is my personal blog used to collect ideas and things I wana talk about."
        openGraph={{
          url: "https://www.zacharyp.blog/",
          images: [
            {
              url: "https://res.cloudinary.com/dey85zjmf/image/upload/v1644170623/ZacharypBlogLight_s9fesz.png",
              width: 1901,
              height: 910,
              alt: "ZacharyP.blog Light mode logo",
              type: "image/png",
            },
            {
              url: "https://res.cloudinary.com/dey85zjmf/image/upload/v1644170623/ZacharypBlogDark_bjjapj.png",
              width: 1901,
              height: 910,
              alt: "ZacharyP.blog Dark mode logo",
              type: "image/png",
            },
          ],
        }}
      />
      <Navbar />
      <Stack alignItems="center">
        <Flex
          as="main"
          justifyContent="center"
          flexDirection="column"
          bg={bgColor[colorMode]}
          px={[4, 4, 4]}
          mt={[4, 8, 8]}
        >
          {
            <Box>
              {posts.map((posts, index) => (
                <Post posts={posts} key={index} />
              ))}
            </Box>
          }
        </Flex>
      </Stack>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await supabase.from("blogPosts").select();

  return {
    props: {
      posts: data.sort(sortByID),
    },
    revalidate: 5,
  };
}

export default Home;

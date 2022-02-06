import Post from "@components/Post";
import { NextSeo } from "next-seo";

import { sortByID } from "@utils/index";
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

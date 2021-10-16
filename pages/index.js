import Post from "@components/Post";
import Image from "next/image";
import { sortByID } from "@utils/index";
import Container from "@components/Container";
import { Flex, Box, useColorMode, Stack } from "@chakra-ui/react";
import supabase from "@utils/initSupabase";
import { bgColor } from "@styles/colorModeStyles";

const Home = ({ posts }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Container />
      <Stack alignItems="center">
        <Image src="/Signature.svg" height={500} width={500} />

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

import Post from "@components/Post";
import { sortByID } from "@utils/index";
import Container from "@components/Container";
import { Image, Flex, Box, useColorMode, Stack } from "@chakra-ui/react";
import supabase from "@utils/initSupabase";

const Home = ({ posts }) => {
  const { colorMode } = useColorMode();

  const bgColor = {
    light: "backgroundLight",
    dark: "#backgroundDark",
  };

  const color = {
    light: "secondary",
    dark: "primary",
  };
  return (
    <>
      <Container />
      <Stack alignItems="center">
        <object
          type="image/svg+xml"
          data="/SVGsig.svg"
          alt=""
          width="75%"
          height="75%"
          placeholder=""
        >
          <img src="/SVGsig.svg" />
        </object>

        <Flex
          as="main"
          justifyContent="center"
          flexDirection="column"
          bg={bgColor[colorMode]}
          color={color[colorMode]}
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

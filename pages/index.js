import Post from "@components/Post";
import { sortByID } from "@utils/index";
import Container from "@components/Container";
import { Image, Flex, Box, useColorMode } from "@chakra-ui/react";
import supabase from "@utils/initSupabase";

const Home = ({ posts }) => {
  const randomNumber = Math.floor(Math.random() * 100);
  const { colorMode } = useColorMode();

  const bgColor = {
    light: "white",
    dark: "#171717",
  };

  const color = {
    light: "black",
    dark: "white",
  };
  return (
    <>
      <Container />
      <Image
        src={`https://avatars.dicebear.com/api/bottts/${randomNumber}.svg`}
        margin-top="1rem"
        boxSize="3rem"
        alt=""
      />
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        bg={bgColor[colorMode]}
        color={color[colorMode]}
        px={[0, 4, 4]}
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

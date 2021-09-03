// import fs from "fs";
// import matter from "gray-matter";
// import path from "path";
import Post from "@components/Post";
import { sortByID } from "@utils/index";
import Container from "@components/Container";
import { Image } from "@chakra-ui/react";
import supabase from "@utils/initSupabase";

const Home = ({ posts }) => {
  const randomNumber = Math.floor(Math.random() * 100);
  return (
    <>
      <Container>
        <Image
          src={`https://avatars.dicebear.com/api/bottts/${randomNumber}.svg`}
          margin-top="1rem"
          boxSize="3rem"
          alt=""
        />
        <div>
          {posts.map((posts, index) => (
            <Post posts={posts} key={index} />
          ))}
        </div>
      </Container>
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

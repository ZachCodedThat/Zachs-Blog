// import fs from "fs";
// import matter from "gray-matter";
// import path from "path";
import Post from "@components/Post";
import supabase from "@utils/initSupabase";
import Container from "@components/Container";

export default function Home({ blogPosts }) {
  return (
    <>
      <Container>
        <div>
          {blogPosts.map((blogPosts) => (
            <Post post={blogPosts} key={blogPosts.slug} />
          ))}
        </div>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase
    .from("blogPosts")
    .select("id, title, date, image, description, body, slug");

  return {
    props: {
      blogPosts: data,
    },
  };
}

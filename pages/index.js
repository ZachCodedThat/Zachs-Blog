import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Post from "@components/Post";
import { sortByDate } from "@utils/index";
import Container from "@components/Container";
import { Image } from "@chakra-ui/react";

const Home = ({ posts }) => {
  const randomNumber = Math.floor(Math.random() * 100);
  return (
    <>
      <Container>
        <Image
          src={`https://avatars.dicebear.com/api/bottts/${randomNumber}.svg`}
          margin-top="1rem"
          boxSize="3rem"
          position="top"
        />
        <div>
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
        </div>
      </Container>
    </>
  );
};

// The component Post is able to accept the props generated by the following getStaticprops
// It maps through the array produced by getStaticprops

export async function getStaticProps() {
  // get files from the posts dir
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    //create slug

    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}

export default Home;

import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Head from "next/head";
import Post from "../components/Post";
import { sortByDate } from "../utils";

const Home = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

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

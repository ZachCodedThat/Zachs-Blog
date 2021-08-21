import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Link from "next/link";

const PostPage = ({ frontmatter: { title, date, cover_image }, content }) => {
  // frontmatter and content are props from getStaticProps.

  return (
    <>
      <Link href="/">
        <a href="btn btn-back" className="btn">
          Go Back
        </a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
      </div>
      <div className="post-date">Posted on {date}</div>
      <img src={cover_image} alt="" />
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      ></div>
    </>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  // creates a variable that creates an array of all of the files within the posts directory

  const paths = files.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  // takes the variable "files" and maps it against a function that for every file in the posts folder that removes the .md tag from the filename
  // this creates an [{}] which is sent to getStaticProps when a new slug is called for.

  return {
    paths,
    // this returns params: { slug: filename.replace(".md", "") }
    fallback: false,
    // this throws a 404 if an unknown path/slug is called
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  // getStaticProps takes in chosen slug within the "posts" directory passed from getStaticPaths
  // creates a variable that is content of the markdown file within the posts directory created by the slug + .md
  // utf-8 refers to the HTML character set

  const { data: frontmatter, content } = matter(markdownWithMeta);

  // matter takes the markdown file and parses it to seperate the front-matter and the content needing to be rendered.
  // the parsed file returns a props {} containing data from the parsed elemtents that can now be used with the JSX above to render content to the page.

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}

export default PostPage;

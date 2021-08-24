import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import NextLink from "next/link";
import Container from "@components/Container";
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Box,
  Link,
  Image,
  Button,
  Stack,
} from "@chakra-ui/react";

const PostPage = ({ frontmatter: { title, date, cover_image }, content }) => {
  // frontmatter and content are props from getStaticProps.
  const { colorMode } = useColorMode();
  const color = {
    light: "primary",
    dark: "highlight",
  };
  const navHoverBg = {
    light: "primary",
    dark: "highlight",
  };

  return (
    <Container>
      <Stack
        as="main"
        borderRadius="10px"
        spacing={7}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="100%"
        px={2}
      >
        <NextLink href="/">
          <Box>
            <Button
              size="md"
              variant="ghost"
              cursor="pointer"
              marginBottom="5px"
              _hover={{ bg: navHoverBg[colorMode], color: "black" }}
              as="a"
            >
              Back
            </Button>
          </Box>
        </NextLink>
        <Flex className="card card-page">
          <Heading fontSize="6xl">{title} </Heading>
        </Flex>
        <Text
          bg={color[colorMode]}
          color="black"
          as="date"
          padding="5px"
          width="100%"
          fontSize="xl"
        >
          Posted on {date}
        </Text>

        <Image
          src={cover_image}
          alt=""
          padding="10px"
          width="80%"
          alignSelf="center"
        />

        <Flex
          as="post-body"
          width="100%"
          align="flex-start"
          justifyContent="space-between"
          flexDirection={["column", "row"]}
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></Flex>
      </Stack>
    </Container>
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

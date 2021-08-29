// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
import marked from "marked";
import NextLink from "next/link";
import Container from "@components/Container";
import supabase from "@utils/initSupabase";
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

export default function PostPage(post) {
  const { title, description, id, image, date, slug } = post;
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
          src={image}
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
          dangerouslySetInnerHTML={{ __html: marked(body) }}
        ></Flex>
      </Stack>
    </Container>
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

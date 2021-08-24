import React from "react";
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
import CreatePost from "@components/CreatePost";

const BlogPost = () => {
  return (
    <Container>
      <Flex>
        <CreatePost />
      </Flex>
    </Container>
  );
};

export default BlogPost;

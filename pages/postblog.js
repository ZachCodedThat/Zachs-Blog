import React from "react";
import Container from "@components/Container";
import { Flex } from "@chakra-ui/react";
import CreatePost from "@components/CreatePost";

const BlogPost = () => {
  return (
    <Container>
      <Flex w="100%" h="100%">
        <CreatePost />
      </Flex>
    </Container>
  );
};

export default BlogPost;

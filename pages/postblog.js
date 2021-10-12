import React from "react";
import Container from "@components/Container";
import { Flex } from "@chakra-ui/react";
import CreatePost from "@components/CreatePost";

const BlogPost = () => {
  return (
    <>
      <Container />
      <Flex
        justifyContent="center"
        flexDirection="column"
        px={[0, 4, 4]}
        mt={[4, 8, 8]}
      >
        <CreatePost />
      </Flex>
    </>
  );
};

export default BlogPost;

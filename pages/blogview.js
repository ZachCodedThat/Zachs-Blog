import React from "react";
import Container from "@components/Container";
import { Flex } from "@chakra-ui/react";

import ViewPost from "@components/ViewPost";

const BlogPost = () => {
  return (
    <Container>
      <Flex>
        <ViewPost />
      </Flex>
    </Container>
  );
};

export default BlogPost;

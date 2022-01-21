import React from "react";
import Navbar from "@components/Navbar";
import { Flex } from "@chakra-ui/react";
import CreatePost from "@components/CreatePost";
import NotFound from "@components/404";

const BlogPost = () => {
  const isDev = process.env.NODE_ENV === "development";
  return (
    <>
      <Navbar />
      <Flex
        justifyContent="center"
        flexDirection="column"
        px={[0, 4, 4]}
        mt={[4, 8, 8]}
      >
        {isDev ? <CreatePost /> : <NotFound />}
      </Flex>
    </>
  );
};

export default BlogPost;

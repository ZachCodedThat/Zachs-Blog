import { useState, useEffect } from "react";

import fire from "src/fire-config";

const ViewPost = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collection("blog")
      .onSnapshot((snap) => {
        const blogs = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogs);
      });
  }, []);
  console.log(blogs);

  return (
    <ul>
      {blogs.map((blog) => (
        <h1 key={blog.id}>{blog.title}</h1>
      ))}
    </ul>
  );
};
export default ViewPost;

import nc from "next-connect";
import supabase from "@utils/initSupabase";

const handler = nc({
  onError: (error, req, res, next) => {
    res.status(500).end();
  },
});

handler.post(async (req, res) => {
  const newPost = JSON.parse(req.body);

  const result = await supabase.from("blogPosts").insert([{ ...newPost }]);
  const post = result.data[0];

  console.log("Successfully created your post!");
  res.send({ post });
});

handler.delete(async (req, res) => {
  const { id } = JSON.parse(req.body);

  const result = await supabase.from("blogPosts").delete().match({ id });

  const post = result.data[0];

  console.log("Successfully deleted your post!");
  res.send({ post });
});

export default handler;

// It creates a handler that works for posting to the DB and deleting from it.

// this API file has a special [[...id ]].js name which tells Next what id# is being handled from the DB.
//    which is then passed to the Delete function in the handler
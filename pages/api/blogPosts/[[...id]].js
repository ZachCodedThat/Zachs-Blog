import nc from "next-connect";
import supabase from "@utils/initSupabase";

/* 
Next connect is a Nextjs optimized replacement for express. for my purposes it handeles the posting and deletion requests for my blog posts. Given the 
  way this is set up this is all behind the scenes, regular user traffic can not hit this handler and only when I fire up a development server can it be used.

this API file has a special [[...id ]].js name which tells Next what id# is being handled from the DB which is then passed to the Delete function in the handler
T his is done to ensure that only the correct id# is being deleted. 

I plan to expand this into being able to live edit posts in the future which will follow the same pattern as these handler functions but allow me to edit information and 
  replace it in the DB.
**/

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

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

// this API file has a special [[...id ]].js name which tells Next what id# is being handled from the DB.
//    which is then passed to the Delete function in the handler

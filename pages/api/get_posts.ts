import { firestore } from "@/components/firebase/config";
import { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection } from "firebase/firestore";
import { PostDataInterface, PostResponseConfig } from "@/components/interfaces";
import cors from "@/libs/cors";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponseConfig>
) {
  if (req.method != "GET") {
    res.json({ status: 400, message: "Bad Request", postData: [] });
    return;
  }
  try {
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = page * limit;
    const endIndex = startIndex + limit;
    const collectionData = collection(firestore, "posts");

    const postData = (await getDocs(collectionData)).docs.map((doc) => {
      return doc.data() as PostDataInterface;
    });

    const paginatedPosts = postData.reverse().slice(startIndex, endIndex);

    const sortedPosts = [...paginatedPosts].sort((a, b) => 
      new Date(b.post_time).getTime() - new Date(a.post_time).getTime()
    );
    res.json({
      status: 200,
      message: "fetch success",
      postData: sortedPosts,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: 400, message: "error fetching docs", postData: [] });
  }
}

export default cors(handler as any);

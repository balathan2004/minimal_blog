import { firestore } from "@/components/firebase/config";
import { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection } from "firebase/firestore";
import { PostDataInterface, PostResponseConfig } from "@/components/interfaces";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<PostResponseConfig>
) {
  try {

    const collectionData = collection(firestore, "posts");

    const postData = (await getDocs(collectionData)).docs.map((doc) => {
      return doc.data() as PostDataInterface;
    });

    res.json({
      status: 200,
      message: "fetch success",
      postData: postData,
    });
  } catch (err) {
    console.log(err)
    res.json({ status: 400, message: "error fetching docs", postData: [] });
  }
}

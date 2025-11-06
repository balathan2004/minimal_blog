import { NextApiRequest, NextApiResponse } from "next";
import {
  PostDataInterface,
  SinglePostResponseConfig,
} from "@/components/interfaces";
import { firestore } from "@/components/firebase/config";
import { getDoc, doc } from "firebase/firestore";
import withMiddleware from "@/libs/cors";
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SinglePostResponseConfig>
) {
  const post_name = req.query.post_name as string;

  if (post_name) {
    console.log(post_name);

    const docRef = doc(firestore, "posts", post_name);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("snap available");
      const docData = docSnap.data() as PostDataInterface;
      res.status(200).json({ message: "document fetched", postData: docData });
    } else {
      res.status(404).json({ message: "document not fetched", postData: null });
      console.log("snap not available");
    }
  } else {
    res.status(404).json({ message: "document not fetched", postData: null });
    console.log("snap not available");
  }
}

export default withMiddleware(handler as any);

import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/components/firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ResponseConfig } from "@/components/interfaces";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
  
    const userId =
      req.cookies["minimal_blog_uid"] || req.body.post_user_id || false;

    const {
      post_name,
      post_user_id,
      post_caption,
    }: { post_name: string; post_user_id: string; post_caption: string } =
      req.body;

    if (!post_name || !post_user_id || userId != post_user_id) {
      res.json({ message: "Fields Missing", status: 300 });
      return;
    }

    const docRef = doc(firestore, "posts", post_name);

    const getDocument = await getDoc(docRef);

    if (!getDocument.exists()) {
      res.json({ message: "post doesnt exits", status: 300 });
      return;
    }

    await updateDoc(docRef, {
      post_caption: post_caption,
    });

    res.json({ message: "post updated", status: 200 });
  } catch (err) {
    res.json({ message: "Error updating Post", status: 300 });
    return;
  }
}

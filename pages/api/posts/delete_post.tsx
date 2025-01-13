import { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@/components/firebase/config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { ResponseConfig } from "@/components/interfaces";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const userId = req.cookies["minimal_blog_uid"] || false;

    const {
      post_name,
      post_user_id,
    }: { post_name: string; post_user_id: string } = req.body;

    if (!post_name || !post_user_id || userId != post_user_id) {
      res.json({ message: "Fields Missing", status: 300 });
      return;
    }

    const docRef = doc(firestore, "posts", post_name);

    const getDocument = await getDoc(docRef);

    if (!getDocument.exists()) {
      res.json({ message: "post Already Deleted", status: 300 });
      return;
    }

    await deleteDoc(docRef);

    res.json({ message: "post deleted", status: 200 });
  } catch (err) {
    res.json({ message: "Error Deleting Post", status: 300 });
    return;
  }
}

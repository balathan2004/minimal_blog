import { firestore } from "@/components/firebase/config";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getDocs,
  getDoc,
  doc,
  collection,
  query,
  where,
} from "firebase/firestore";
import {
  PostDataInterface,
  ProfileResponseConfig,
  UserDataInterface,
} from "@/components/interfaces";
import withMiddleware from "@/libs/cors";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileResponseConfig>
) {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({
        message: "Bad Request Missing Params",
        postData: null,
        userData: null,
      });
    }

    const collectionData = collection(firestore, "posts");
    const userDoc = await getDoc(doc(firestore, "users", userId));
    const checkAuthorizedUser = userDoc.exists();

    if (checkAuthorizedUser) {
      const queryDoc = query(
        collectionData,
        where("post_user_id", "==", userId)
      );
      const postData = (await getDocs(queryDoc)).docs.map(
        (doc) => doc.data() as PostDataInterface
      );
      const userData = userDoc.data() as UserDataInterface;

      res.status(200).json({
        message: "fetch success",
        postData: postData,
        userData: userData,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "error fetching docs",
      postData: null,
      userData: null,
    });
  }
}

export default withMiddleware(handler as any);

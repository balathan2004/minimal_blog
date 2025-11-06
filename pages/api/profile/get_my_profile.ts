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
import { authenticateToken } from "@/components/auth/api_utils";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileResponseConfig>
) {
  try {
    const uid = req.cookies.minimal_blog_uid || false;

    if (!uid) {
      res.status(300).json({
        message: "wrong profile ",
        postData: null,
        userData: null,
      });
      return;
    }

    const collectionData = collection(firestore, "posts");
    const userDoc = await getDoc(doc(firestore, "users", uid));

    const checkAuthorizedUser = userDoc.exists();

    if (checkAuthorizedUser) {
      const queryDoc = query(collectionData, where("post_user_id", "==", uid));
      const postData = (await getDocs(queryDoc)).docs.map(
        (doc) => doc.data() as PostDataInterface
      );
      const userData = userDoc.data() as UserDataInterface;

      console.log({ userData, postData });

      res.status(200).json({
        message: "fetch success",
        postData: postData,
        userData: userData,
      });
    } else {
      res.status(300).json({
        message: "error fetching docs",
        postData: null,
        userData: null,
      });
    }
  } catch (err) {
    res.status(300).json({
      message: "error fetching docs",
      postData: null,
      userData: null,
    });
  }
}

export default withMiddleware(handler as any);

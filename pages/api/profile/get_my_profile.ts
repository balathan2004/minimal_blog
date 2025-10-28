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

async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ProfileResponseConfig>
) {
  try {

    const userId = req.query.userId as string;
    console.log(userId);

    if (userId) {
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

        res.json({
          status: 200,
          message: "fetch success",
          postData: postData,
          userData: userData,
        });
      } else {
        res.json({
          status: 400,
          message: "error fetching docs",
          postData: null,
          userData: null,
        });
      }
    } else {
      res.json({
        status: 400,
        message: "wrong profile ",
        postData: null,
        userData: null,
      });
    }
  } catch (err) {
    res.json({
      status: 400,
      message: "error fetching docs",
      postData: null,
      userData: null,
    });
  }
}


export default withMiddleware(handler as any)
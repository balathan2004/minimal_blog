// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import IncomingForm from "formidable";
import { PostDataInterface, ResponseConfig } from "@/components/interfaces";
import formidable from "formidable";
import moment from "moment";
import { firestore, storage } from "@/components/firebase/config";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import fs from "fs";
import { ref } from "@firebase/storage";
import {doc,setDoc} from 'firebase/firestore'
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  console.log("requested");
  await post(req);
  res.json({ message: "success", status: 200 });
}

async function post(req: NextApiRequest) {
  const form = IncomingForm();

  form.parse(req, async(err, fields, files) => {
    console.log(fields, files);
    const caption = fields.caption ? fields.caption[0] : "";
    const userId= fields.userId ? fields.userId[0] : "";
        const username= fields.username ? fields.username[0]:""
    const file = files.file ? files.file[0] : null;

    const postName=`${userId}_${new Date().getTime()}`
    const fileName=`${postName}.jpg`
    if (file && caption && userId && username) {
      
      const imageUrl=await UploadImage(file, fileName);
      const postData:PostDataInterface={
        post_user_name:username,
        post_name: postName,
        post_caption: caption,
        post_time: setDate(),
        post_user_id: userId,
        post_image_url: imageUrl,
      }
      await AddDoc(postData);
    }
  });
}

async function UploadImage(file: formidable.File, fileName: string) {
  const blob = fs.readFileSync(file.filepath);

  try {
    const storageRef = ref(storage, `/posts/${fileName}`);
    await uploadBytesResumable(storageRef, blob, {
      contentType: "image/jpeg",
    });
    var imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  } catch (e) {
    console.log(e);
    return "";
  }
}

async function AddDoc(postData:PostDataInterface){
  const postRef = doc(firestore,"posts",postData.post_name);
  await setDoc(postRef, postData);
}



const setDate = () => {
  var nowDate = new Date();
  var newDate = moment(nowDate).format("DD-MM-YYYY hh:mm a");
  return newDate;
};

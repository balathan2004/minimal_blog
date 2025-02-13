import type { NextApiRequest, NextApiResponse } from "next";
import IncomingForm from "formidable";
import { PostDataInterface, ResponseConfig } from "@/components/interfaces";
import formidable from "formidable";
import { firestore, storage } from "@/components/firebase/config";
import { uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref } from "@firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import cors from "@/libs/cors";
import sharp from "sharp";
import { PassThrough } from "stream";

// file no longer used anymore

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const postData = await formParsing(req);
    res.status(200).json({ message: "Post sent for processing", status: 200 });

    if (postData) {
      console.log("Uploading post data to Firestore...");
      try {
        await AddDoc(postData);
      } catch (docError) {
        console.error("Error adding document to Firestore:", docError);
        throw docError;
      }
    } else {
      throw new Error("Failed to parse post data.");
    }
  } catch (err: any) {
    console.error("Error processing request:", err.message);
    res.status(400).json({ message: err.message, status: 400 });
  }
}

async function UploadImage(
  file: formidable.File,
  fileName: string,
  userId: string
) {
  const imageStream = await sharp(file.filepath)
    .resize({ width: 1200, fit: "cover" })
    .jpeg({ quality: 75 })
    .toBuffer();

  const blurStream = await sharp(file.filepath)
    .resize({ width: 10 }) // Small width for low resolution
    .jpeg({ quality: 50 })
    .toBuffer();

  try {
    const storageRef = ref(storage, `/posts/${userId}/${fileName}`);
    const blurRef = ref(storage, `/posts/${userId}/blurred-${fileName}`);

    await uploadBytesResumable(storageRef, imageStream, {
      contentType: "image/jpeg",
    });
    await uploadBytesResumable(blurRef, blurStream, {
      contentType: "image/jpeg",
    });

    const imageUrl = await getDownloadURL(storageRef);
    const blurUrl = await getDownloadURL(blurRef);

    return { imageUrl, blurUrl };
  } catch (e) {
    console.error("Error uploading image to Firebase Storage:", e);
    throw e;
  }
}

async function formParsing(req: NextApiRequest) {
  const form = IncomingForm();

  const postData = await new Promise<PostDataInterface | null>(
    (resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        console.log("Fields:", fields);
        console.log("Files:", files);

        if (err) {
          console.error("Error parsing form data:", err);
          reject(err);
          return;
        }

        const caption = fields.caption ? fields.caption[0] : null;
        const userId = fields.userId ? fields.userId[0] : null;
        const username = fields.username ? fields.username[0] : null;
        const file = files.file ? files.file[0] : null;

        // Exit early if required fields are missing
        if (!caption || !userId || !username || !file) {
          const errorMessage =
            "Missing required fields: caption, userId, username, or file.";
          console.error(errorMessage);
          reject(new Error(errorMessage));
          return;
        }

        const postName = `${userId}_${new Date().getTime()}`;
        const fileName = `${postName}.jpg`;

        try {
          const imageData = await UploadImage(file, fileName, userId);
          const postData: PostDataInterface = {
            post_user_name: username,
            post_name: postName,
            post_caption: caption,
            post_time: new Date().getTime(),
            post_user_id: userId,
            post_image_url: imageData?.imageUrl,
            post_blur_url: imageData?.blurUrl,
          };
          console.log("Post Data:", postData);
          resolve(postData);
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          reject(uploadError);
        }
      });
    }
  );
  return postData;
}

async function AddDoc(postData: PostDataInterface) {
  const postRef = doc(firestore, "posts", postData.post_name);
  await setDoc(postRef, postData);
}

const sharpToStream = (sharpInstance: sharp.Sharp) => {
  const stream = new PassThrough();
  sharpInstance.pipe(stream);
  return stream;
};

export default cors(handler as any);

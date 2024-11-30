// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import IncomingForm from "formidable";
import { PostDataInterface, ResponseConfig } from "@/components/interfaces";

import { cors } from "@/libs/cors";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  if(cors(req,res)) return;
  console.log("requested");
  await post(req);
  res.json({ message: "success", status: 200 });
}

async function post(req: NextApiRequest) {
  const form = IncomingForm();

  form.parse(req, async(err, fields, files) => {
    console.log(fields, files);
       
    }
  );
}

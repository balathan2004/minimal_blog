import { NextApiRequest,NextApiResponse} from "next";
import { PostDataInterface, SinglePostResponseConfig } from "@/components/interfaces";
import { firestore } from "@/components/firebase/config";
import { getDoc,doc } from "firebase/firestore";
import { cors } from "@/libs/cors";
export default async function(req:NextApiRequest,res:NextApiResponse<SinglePostResponseConfig>){

  if(cors(req,res)) return;

  const post_name=req.query.post_name as string 

  if(post_name){
    console.log(post_name)

  const docRef=doc(firestore,'posts',post_name);
   const docSnap=await getDoc(docRef)
  if(docSnap.exists()){

    console.log("snap available")
    const docData=docSnap.data() as PostDataInterface
    res.json({status:200,message:"document fetched",postData:docData})
    
  }else{
    res.json({status:300,message:"document not fetched",postData:null})
    console.log("snap not available")
  }


  }else{
    res.json({status:300,message:"document not fetched",postData:null})
    console.log("snap not available")
  }


}
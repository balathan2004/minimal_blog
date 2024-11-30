import { NextApiRequest,NextApiResponse } from "next";
import { cors } from "@/libs/cors";


export default (req:NextApiRequest, res:NextApiResponse)=>{


    if(cors(req,res)){
        return;
    }
    
    if(req.method=="POST"){
        console.log(req.body);
        const {name}=(req.body)
        res.json({message:"success",name:name});
    }

  

}
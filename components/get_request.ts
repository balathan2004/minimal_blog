import { Responses } from "./send_data";

export const GetRequest=async(route:string)=>{


 

  const response = await fetch(route,{
    method: 'GET',
    headers:{
      "Origin": "http://localhost:3000"
    }
  });
  const responseJson:Responses= await response.json();
  return responseJson;


}
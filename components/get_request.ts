import { Responses } from "./send_data";

export const GetRequest=async(route:string)=>{


 

  const response = await fetch(route,{
    method: 'GET',
  });
  const responseJson:Responses= await response.json();
  return responseJson;


}
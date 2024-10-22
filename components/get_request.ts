import { Responses } from "./send_data";

export const GetRequest=async(route:string)=>{


  const RequestConfig:RequestInit={
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(route, RequestConfig);
  const responseJson:Responses= await response.json();
  return responseJson;


}
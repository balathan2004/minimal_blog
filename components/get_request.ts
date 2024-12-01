import { Responses } from "./send_data";

export const GetRequest=async(route:string)=>{


  const RequestConfig:RequestInit={
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Origin":"http://localhost:3000"
    },
  }

  const response = await fetch(route, RequestConfig);
  const responseJson:Responses= await response.json();
  return responseJson;


}
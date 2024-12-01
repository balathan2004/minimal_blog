import { Responses } from "./send_data";

export const GetRequest = async (route: string) => {
  const response = await fetch(route, {
    method: "GET",
    headers:{
      "minimal-access-token":"light@blog2406"
    }
  });
  const responseJson: Responses = await response.json();
  return responseJson;
};

import { ResponseConfig } from "./interfaces";

interface Props {
  data: FormData;
  route: string;
}

export default async function SendFile({ data, route }: Props) {
  const RequestConfig: RequestInit = {
    body: data,
    method: "POST",
    headers:{
      "minimal-access-token":"light@blog2406"
    }
  };

  const response = await fetch(route, RequestConfig);
  const responseJson: ResponseConfig = await response.json();
  return responseJson;
}

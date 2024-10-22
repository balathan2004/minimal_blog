import { ResponseConfig,AuthResponseConfig } from "./interfaces";

export type Responses=ResponseConfig | AuthResponseConfig


interface Props {
  data: object;
  route: string;
}

export default async function SendData({ data, route }: Props) {
  const RequestConfig: RequestInit = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  };

  const response = await fetch(route, RequestConfig);
  const responseJson: Responses = await response.json();
  return responseJson;
}

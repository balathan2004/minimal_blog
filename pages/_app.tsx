import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import LoadingHolder from "@/components/context/loading_context";
import ReplyHolder from "@/components/context/Reply_context";
import UserHolder from "@/components/context/user_context";
import NavHolder from "@/components/context/navbar_context";
import ContextWrapper from "@/components/context/context_wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Minimal Blog</title>
      </Head>
      <UserHolder>
        <NavHolder>
          <ReplyHolder>
            <LoadingHolder>
              <ContextWrapper>
                <Component {...pageProps} />
              </ContextWrapper>
            </LoadingHolder>
          </ReplyHolder>
        </NavHolder>
      </UserHolder>
    </>
  );
}

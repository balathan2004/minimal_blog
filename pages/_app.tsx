import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Prevent duplicate styles
import Head from "next/head";
import LoadingHolder from "@/components/context/loading_context";
import ReplyHolder from "@/components/context/Reply_context";
import ContextWrapper from "@/components/context/context_wrapper";
import { Provider } from "react-redux";
import { store } from "@/components/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Minimal Blog</title>
      </Head>
      <Provider store={store}>
    
          <ReplyHolder>
            <LoadingHolder>
              <ContextWrapper>
                <Component {...pageProps} />
              </ContextWrapper>
            </LoadingHolder>
          </ReplyHolder>
     
      </Provider>
    </>
  );
}

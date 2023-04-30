import "scss-reset/src/scss/_reset.scss";

import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "@/components/Layout/Layout";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const { worker } = require("@/services/mocks/browser");
  worker.start();
}

const queryClient = new QueryClient();

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Head>
        <title>코딩가든</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Layout children={<Component {...pageProps} />} />
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default CustomApp;

// src/pages/_app.tsx

import { Inter as FontSans } from "@next/font/google";

import "~/styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "../utils/api";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      {" "}
      <style jsx global>{`
    :root {
      --font-sans: ${fontSans.style.fontFamily};
    }
  }`}</style>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);

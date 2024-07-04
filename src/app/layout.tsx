"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Theme } from "@radix-ui/themes";

import { pretendard, robotoMono, sofiaSans } from "@/app/assets/fonts";

// import "@radix-ui/themes/styles.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
import "./globals.css";

// custom radix theme
// import "@/styles/radix-theme.css";

import Header from "./components/Header";
import Command from "./components/Command";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  return (
    <html
      lang="en"
      className={`${sofiaSans.variable} ${pretendard.variable} ${robotoMono.variable}`}
    >
      <body>
        {/* <Theme appearance="dark"> */}
        <Header />
        <QueryClientProvider client={queryClient}>
          <Command />
          {children}
        </QueryClientProvider>
        {/* </Theme> */}
      </body>
    </html>
  );
}

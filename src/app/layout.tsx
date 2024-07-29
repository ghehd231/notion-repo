"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { pretendard, robotoMono, sofiaSans } from "@/app/assets/fonts";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
import "./globals.css";

import Header from "./components/Header";
import Command from "./components/Command";
import Footer from "./components/Footer";

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
        <Header />
        <QueryClientProvider client={queryClient}>
          <Command />
          {children}
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}

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
import Providers from "./components/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sofiaSans.variable} ${pretendard.variable} ${robotoMono.variable}`}
    >
      <body>
        <Header />
        <Providers>
          <Command />
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}

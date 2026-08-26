import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { ClientProviders } from "./providers";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Background from "@/components/layout/Background";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ultimate NBA Trivia",
    template: "%s | Ultimate NBA Trivia",
  },
  description:
    "Play NBA trivia, test your basketball knowledge, and compete with other fans. Watch, play, and climb the leaderboard!",
  keywords: [
    "NBA Trivia",
    "Basketball Quiz",
    "NBA Questions",
    "NBA Fans",
    "Basketball Knowledge",
  ],
  authors: [{ name: "Ultimate NBA Trivia" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ultimatenbatrivia.com",
    siteName: "Ultimate NBA Trivia",
    title: "Ultimate NBA Trivia",
    description:
      "Think you know ball? Play interactive NBA trivia alongside our YouTube channel and compete for the leaderboard!",
    images: [
      {
        url: "/banner.png", // use the banner you uploaded
        width: 1200,
        height: 630,
        alt: "Ultimate NBA Trivia Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${roboto.className} antialiased bg-background`}
      >
        <ClientProviders>

        
        <div className="dark">
        <Background>
          {/* <div>{children}</div> */}
          {/* do i add a provider? */}
          <Navbar />
            <main>
              {children}
            </main>
          <Footer />
        </Background>
        </div>
        </ClientProviders>
        
      </body>
    </html>
  );
}

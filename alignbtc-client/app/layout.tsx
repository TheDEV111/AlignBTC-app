import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Headlines / display — sharp, geometric anchor.
const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Body — the workhorse for dense data and copy.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// UI labels and status chips — precise "developer-tool" aesthetic.
const geist = Geist({
  variable: "--font-ui",
  subsets: ["latin"],
});

// Code snippets and mono data.
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlignBTC — Built for Bitcoin",
  description:
    "A high-performance interface for stacking, monitoring, and aligning your BTC across the Stacks ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Material Symbols — used for feature and status iconography. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="bg-mesh min-h-full flex flex-col text-on-background font-sans overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

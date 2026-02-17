import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";
import LayoutClient from "../components/LayoutClient";

const sans = localFont({
  src: [
    { path: "../public/fonts/InterVariable.woff2", style: "normal" },
    { path: "../public/fonts/InterVariable-Italic.woff2", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const display = localFont({
  src: [
    {
      path: "../public/fonts/InterDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const mono = localFont({
  src: "../public/fonts/JetBrainsMono.woff2",
  variable: "--font-mono",
  display: "swap",
});

const serif = localFont({
  src: "../public/fonts/Lora-Italic-Variable.woff2",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jack Brind",
  description: "Jack Brind's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="font-sans flex flex-col gap-12 w-2xl m-auto min-h-screen mt-24 mb-16">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

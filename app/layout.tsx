import type { Metadata } from "next";
import "./global.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className="flex flex-col gap-12 w-3xl m-auto min-h-screen">
        <Navigation/>
        <main className="p-6 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

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
      <body className="flex flex-col gap-12">
        <Navigation />
        <main className="p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

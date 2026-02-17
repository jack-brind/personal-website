// Client component to allow usePathname hook and not
// clash with Metadata in the layout.ts RSC
"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navigation isHome={isHome} />
      <main>{children}</main>
      {isHome && <Footer />}
    </ThemeProvider>
  );
}

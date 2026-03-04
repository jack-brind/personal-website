// Client component to allow usePathname hook and not
// clash with Metadata in the layout.ts RSC
"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  NavigationTitleProvider,
  useNavigationTitle,
} from "@/context/NavigationTitle";

const staticTitles: Record<string, string> = {
  "/about": "About",
  "/now": "Now",
  "/colophon": "Colophon",
  "/changelog": "Changelog",
  "/contact": "Contact",
  "/uses": "Uses",
  "/shots": "Shots",
};

function LayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { title: contextTitle } = useNavigationTitle();
  const title = contextTitle ?? staticTitles[pathname] ?? undefined;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Navigation isHome={isHome} title={title} />
      <main>{children}</main>
      {isHome && <Footer />}
    </ThemeProvider>
  );
}

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationTitleProvider>
      <LayoutInner>{children}</LayoutInner>
    </NavigationTitleProvider>
  );
}

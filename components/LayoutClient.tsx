// Client component to allow usePathname hook and not
// clash with Metadata in the layout.ts RSC
"use client";

import { useEffect } from "react";
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

  // TO DO: This is a debug method – remove when site content is more mature.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Sets the breadcrumb title to the page title or contex title (e.g. article name)
  const title = contextTitle ?? staticTitles[pathname] ?? undefined;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {(isHome || title !== undefined) && <Navigation isHome={isHome} title={title} />}
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

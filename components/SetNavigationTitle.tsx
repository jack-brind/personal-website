"use client";

import { useEffect } from "react";
import { useNavigationTitle } from "@/context/NavigationTitle";

export function SetNavigationTitle({ title }: { title: string }) {
  const { setTitle } = useNavigationTitle();
  useEffect(() => {
    setTitle(title);
    return () => setTitle(null);
  }, [title, setTitle]);
  return null;
}

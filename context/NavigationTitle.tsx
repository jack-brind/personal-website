"use client";

import { createContext, useContext, useState } from "react";

type NavigationTitleContextType = {
  title: string | null;
  setTitle: (title: string | null) => void;
};

const NavigationTitleContext = createContext<NavigationTitleContextType>({
  title: null,
  setTitle: () => {},
});

export function NavigationTitleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState<string | null>(null);
  return (
    <NavigationTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </NavigationTitleContext.Provider>
  );
}

export function useNavigationTitle() {
  return useContext(NavigationTitleContext);
}

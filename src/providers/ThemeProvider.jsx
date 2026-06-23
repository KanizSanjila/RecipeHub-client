"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  // হাইড্রেশন এরর (Hydration Mismatch) এড়াতে এটি জরুরি
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

 return (
  <NextThemeProvider 
    attribute="class" 
    defaultTheme="light"
    enableSystem={false}  
  >
    {children}
  </NextThemeProvider>
);
}
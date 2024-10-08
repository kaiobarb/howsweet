"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevents rendering on the server, avoids hydration mismatch
  if (!mounted) {
    return <Button size="icon"></Button>;
  }

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
    >
      {theme == "light" && (
        <SunIcon className="scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      )}
      {theme == "dark" && (
        <MoonIcon className="transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
}

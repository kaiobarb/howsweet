import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "How Sweet!",
  description: "Guess how much sugar is in your food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system">
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1 py-6 grid ">{children}</main>
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}

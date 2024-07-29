import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme";

const playwrite = localFont({
  src: "./fonts/PlaywriteVariable.ttf",
  variable: "--font-playwrite",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
    <html lang="en" className={`${inter.variable} ${playwrite.variable}`}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-col min-h-screen bg-background">
            <Nav />
            <main className="flex-1 py-6 grid ">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

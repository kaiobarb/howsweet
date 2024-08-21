import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme";

const playwrite = localFont({
  src: "./fonts/PlaywriteVariable.ttf",
  variable: "--font-playwrite",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fredoka",
});

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
    <html lang="en" className={`${fredoka.variable} ${playwrite.variable}`}>
      <body className={fredoka.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <div className="flex flex-col min-h-screen bg-background">
            <Nav />
            <main className="pt-12">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

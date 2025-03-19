import type { Metadata } from "next";
import { Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/context/theme-provider";
const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "greek-ext", "vietnamese"],
  weight: ["400", "700"], 
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "greek-ext", "vietnamese"],
  weight: ["400", "700"], 
});

export const metadata: Metadata = {
  title: "Language Learning App",
  description: "A platform to learn languages effectively while watching your favorite movies and TV shows.",
};

export default function GlobalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoSerif.variable} antialiased bg-gradient-to-r from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900`}
      >
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

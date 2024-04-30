import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hacker Hire",
  description: "Place to conduct tech interviews",
  openGraph: {
    title: "Hacker Hire",
    description: "Place to conduct tech interviews",
    url: "https://hacker-hire.vercel.app",
    siteName: "Hacker Hire",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/firepad-72e5f.appspot.com/o/hacker-hire.png?alt=media&token=8b2972bb-c950-4d89-863f-da3e7f75446c",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

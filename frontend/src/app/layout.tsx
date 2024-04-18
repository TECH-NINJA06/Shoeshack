'use client'

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/Theme-provider";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const metaData= {
  title: "ShoeShack",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metaData.title}</title>
      </head>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Provider store={store}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";
import NavBar from "@/app/(public)/Components/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
            <NavBar/>
          <Toaster position="top-right" />
          {children}
      
      </body>
    </html>
  );
}

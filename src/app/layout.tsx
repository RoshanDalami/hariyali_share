"use client";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const inter = Inter({ subsets: ["latin"] });
import {Toaster} from 'react-hot-toast'
// import NavBar from "./(public)/Components/NavBar";

import dynamic from "next/dynamic";

const NavBar = dynamic(()=> import('@/app/(public)/Components/NavBar'),{ssr:false})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>

         <Toaster position="top-right" />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}

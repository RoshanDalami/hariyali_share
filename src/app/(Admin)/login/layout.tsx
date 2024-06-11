'use client'
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "react-hot-toast";

// export const metadata: Metadata = {
//   title: "Hariyali Share",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}

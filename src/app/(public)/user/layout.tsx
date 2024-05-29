import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hariyali Share Platform",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="ml-[20%] mt-20 ">{children}</div>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hariyali Share Admin",
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
        <div className="flex">
          <div className="">

          <Navbar/>
          <Sidebar />
          </div>
          <div className="ml-[20%] mt-[88px]"> {children}</div>
        </div>
      </body>
    </html>
  );
}

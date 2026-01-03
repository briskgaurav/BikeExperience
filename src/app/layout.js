import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisSmoothScroll from "@/components/Lenis/Lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RIDE THE EXPERIENCE",
  description: "RIDE THE EXPERIENCE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LenisSmoothScroll />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

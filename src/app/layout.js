import { Jura, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LenisSmoothScroll from "@/components/Lenis/Lenis";

const hatrik = localFont({
  src: "./fonts/hatrik.otf",
  variable: "--font-hatrik",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={` ${ibmPlexMono.variable} ${hatrik.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

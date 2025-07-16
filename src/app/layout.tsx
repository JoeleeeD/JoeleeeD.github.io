import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Verspec",
  description: "The asset management platform technicians love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full py-6 px-4 bg-white shadow-sm flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">Verspec</a>
          <nav className="space-x-6">
            <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
        </header>
        {children}
        <footer className="w-full py-6 px-4 bg-gray-50 text-center text-gray-500 text-sm mt-12">
          &copy; {new Date().getFullYear()} Verspec. All rights reserved.
        </footer>
      </body>
    </html>
  );
}

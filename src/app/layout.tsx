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
  title: "Stryd — Stop Watching. Start Shipping.",
  description: "The execution platform for Nigerian CS students tired of tutorial hell. Build real projects, push to GitHub, and master the stack.",
  keywords: ["coding", "developer", "Nigeria", "CS students", "tutorial hell", "GitHub", "programming"],
  openGraph: {
    title: "Stryd — Stop Watching. Start Shipping.",
    description: "The execution platform for Nigerian CS students tired of tutorial hell. Build real projects, push to GitHub, and master the stack.",
    url: "https://stryd-ng.vercel.app",
    siteName: "Stryd",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stryd — Stop Watching. Start Shipping.",
    description: "The execution platform for Nigerian CS students tired of tutorial hell.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

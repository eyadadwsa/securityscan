import { TempoInit } from "@/components/tempo-init";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureSEO - Security & SEO Analysis Platform",
  description: "Comprehensive security and SEO analysis for your website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
      <body className={inter.className}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <TempoInit />
        </Providers>
      </body>
    </html>
  );
}

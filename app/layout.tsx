import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flipkart Order Confirmation Agent",
  description: "AI Agent for order confirmation calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

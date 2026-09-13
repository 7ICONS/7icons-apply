import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "7ICONS Apply",
    template: "%s | 7ICONS Apply",
  },
  description:
    "Application portal for the 7ICONS & ICONIA digital community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
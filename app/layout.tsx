import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulse Finance Dashboard",
  description:
    "A responsive finance dashboard assignment built with Next.js, interactive charts, filtering, and role-based UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="dark">
      <body className="min-h-full">{children}</body>
    </html>
  );
}

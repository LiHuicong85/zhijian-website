import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "知践咨询 - 数智化时代企业增长的实战陪跑者",
  description: "知践咨询是一家专注于企业利用AI实现快速增长的实战型咨询机构",
  icons: {
    icon: [
      { url: "/logo-ico.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased page-enter">{children}</body>
    </html>
  );
}

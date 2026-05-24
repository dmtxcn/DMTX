import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "大毛同学",
  description: "大毛同学的个人介绍与联系页面。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

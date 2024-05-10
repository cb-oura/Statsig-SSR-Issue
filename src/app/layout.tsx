import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { initStatsig } from "./initStatsig";
import StatsigProvider from "./StatsigProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, values, stableId] = await initStatsig();
  return (
    <html lang="en">
      <body className={inter.className}>
        <StatsigProvider user={user} values={values!}>
          {children}
        </StatsigProvider>
      </body>
    </html>
  );
}

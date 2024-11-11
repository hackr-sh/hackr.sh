import "~/styles/globals.css";
import "~/styles/fonts.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Mohammad Al-Ahdal",
  description: "hackr's world",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#0A2239] flex flex-row items-center justify-center">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

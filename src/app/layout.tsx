import "~/styles/globals.css";
import "~/styles/fonts.css";
import "~/styles/fx.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "Mohammad Al-Ahdal",
  description: "hackr's world",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body className="bg-[#0A2239] flex flex-column items-center justify-center">
        <Navbar />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}

import "~/styles/globals.css";
import "~/styles/fonts.css";
import "~/styles/fx.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar";
import { CommandDialogDemo } from "./_components/cmdk";
import { SessionProvider } from "next-auth/react";

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
      <SessionProvider>
        <body className="bg-[#0A2239] flex flex-column items-center justify-center">
          <Navbar />
          <CommandDialogDemo />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </SessionProvider>
    </html>
  );
}

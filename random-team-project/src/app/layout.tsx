import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ProgressProvider from "@/components/shared/progress-provider";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Random Team Generator",
  description: "Generate balanced teams based on player skill levels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ProgressProvider>
            <Providers>
            {children}
          </Providers>
        </ProgressProvider>
      </body>
    </html>
  );
}

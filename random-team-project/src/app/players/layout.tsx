import { Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Players",
  description: "Players page",
};

export default function PlayersLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

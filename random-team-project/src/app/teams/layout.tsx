import { Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Teams",
  description: "Teams page",
};

export default function TeamsLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

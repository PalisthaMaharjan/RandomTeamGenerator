"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ProgressProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#FF2523"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;

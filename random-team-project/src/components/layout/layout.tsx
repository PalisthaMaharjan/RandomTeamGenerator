"use client";

import React, { Suspense} from "react";
import Header from "./Header/header";




interface LayoutProps {
  children: React.ReactNode;
  isNotFoundPage?: boolean;
}

function Layout({ children}: LayoutProps) {

  return (
    <div className="flex min-h-screen">
      <div className="w-full">
     
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main className="">{children}</main>
  
      </div>
    </div>
  );
}

export default Layout;

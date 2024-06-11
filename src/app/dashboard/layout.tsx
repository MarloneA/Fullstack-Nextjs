import React, { ReactElement } from "react";
import SideNavigation from "../../components/side-navigation";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNavigation />
      {children}
    </div>
  );
}

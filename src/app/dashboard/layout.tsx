import React from "react";
import SideNavigation from "../../components/side-navigation";

export default function layout({ children }) {
  return (
    <div className="flex min-h-screen max-h-screen">
      <SideNavigation />
      {children}
    </div>
  );
}

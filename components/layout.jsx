import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-20 max-w-7xl mx-auto w-11/12 ">{children}</main>
    </div>
  );
};

export default Layout;

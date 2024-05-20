import React from "react";
import HeaderUser from "../../component/header/headerUser";
import Footer from "../../component/footer/footer";

export default function Student({ children }) {
  return (
    <>
      <div className="flex flex-col m-0">
        <HeaderUser />

        <div>{children}</div>

        <Footer />
      </div>
    </>
  );
}

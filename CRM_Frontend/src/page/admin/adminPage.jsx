import { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../../component/header/navBar";
import ToolBar from "../../component/header/toolBar";

AdminPage.propTypes = {
  children: PropTypes.node,
};

export default function AdminPage({ children }) {
  const [isNavbarVisible, setNavbarVisible] = useState(true);

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <ToolBar toggleNavbar={toggleNavbar} isNavbarVisible={isNavbarVisible} />

      {isNavbarVisible && <Navbar />}
      <main
        className={`mt-20 transition-all duration-300 overflow-auto flex-grow p-4 ${
          isNavbarVisible ? "ml-16 md:ml-52" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

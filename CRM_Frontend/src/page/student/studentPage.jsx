import HeaderUser from "../../component/header/headerUser";
import Footer from "../../component/footer/footer";
import PropTypes from "prop-types";

StudentPage.propTypes = {
  children: PropTypes.object,
};

export default function StudentPage({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <HeaderUser />

        <main className="flex-grow overflow-y-auto mt-16">{children}</main>

        <Footer />
      </div>
    </>
  );
}

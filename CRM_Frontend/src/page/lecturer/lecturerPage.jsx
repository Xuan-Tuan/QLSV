import HeaderUser from "../../component/header/headerUser";
import Footer from "../../component/footer/footer";
import PropTypes from "prop-types";

LecturerPage.propTypes = {
  children: PropTypes.object,
};

export default function LecturerPage({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <HeaderUser />

        <main className="flex-grow overflow-y-auto h-full mt-20">
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}

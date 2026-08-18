import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Common User Navbar */}
      <Navbar />

      {/* User Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Common User Footer */}
      <Footer />

    </div>
  );
};

export default UserLayout;
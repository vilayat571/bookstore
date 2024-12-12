import React, { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <div className="xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-11/12 mx-auto">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-[100%]  min-h-screen ">
      <div className="h-[10%]">
        <Header />
      </div>
      <div className="flex-grow h-[80%] flex-1">
        <Outlet />
      </div>
      <div className=" bottom-0 sticky h-[10%]">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;

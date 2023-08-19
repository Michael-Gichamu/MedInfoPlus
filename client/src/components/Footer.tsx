import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" bg-gray-200 text-gray-600 p-4  w-[100vw] h-[5rem] bottom-0 overflow-y-hidden">
      <p>&copy; {new Date().getFullYear()} MedInfoPlus. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

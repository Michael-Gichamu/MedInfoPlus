import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" absolute  bg-gray-200 text-gray-600 p-4  w-[100%] h-[100%] bottom-0">
      <p>&copy; {new Date().getFullYear()} MedInfoPlus. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

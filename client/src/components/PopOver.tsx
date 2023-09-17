// Popover.tsx

import React, { useState, useRef } from "react";
import { PopoverProps } from "../types/types";
import { updateUserCredentials } from "../actions/update.actions";

const Popover: React.FC<PopoverProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [Email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  let popoverStyle: React.CSSProperties = {};

  if (triggerRef.current) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const popoverWidth = 320;

    popoverStyle = {
      left: `${(screenWidth - popoverWidth) / 2}px`,
      top: `${(screenHeight - triggerRef.current.offsetHeight) / 2 - 100}px`,
      width: `${popoverWidth}px`,
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      new_name: newName,
      email: Email,
      new_password: newPassword,
      password: currentPassword,
    };
    const response = await updateUserCredentials(user);
    const data = await response.json();
    console.log(data);

    // Clear the input fields after submission
    setCurrentPassword("");
    setNewName("");
    setNewPassword("");
    setEmail("");
  };

  const popoverContent = (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="text-black text-center text-xl font-medium p-2">
          Change Credentials
        </p>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="mt-1 p-2 border rounded-md w-full"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Current password"
            className="mt-1 p-2 border rounded-md w-full"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="New Name"
            className="mt-1 p-2 border rounded-md w-full"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="New Password"
            className="mt-1 p-2 border rounded-md w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );

  return (
    <div className="relative inline-block">
      <div onClick={togglePopover} ref={triggerRef}>
        {trigger}
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closePopover}
      />
      <div
        className={`fixed transform transition-transform ${
          isOpen ? "scale-100" : "scale-0"
        }`}
        style={popoverStyle}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popover
      >
        <div className="bg-white p-4 border border-gray-300 shadow-lg rounded">
          {popoverContent}
        </div>
      </div>
    </div>
  );
};

export default Popover;

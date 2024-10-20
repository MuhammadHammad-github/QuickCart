import { ChevronLeft } from "@mui/icons-material";
import React, { useState } from "react";

const Dropdown = ({ trigger, children, isOpen, setIsOpen }) => {
  return (
    <div className="relative inline-block">
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none"
      >
        {trigger}
        <ChevronLeft className="-rotate-90" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-50 left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
          {children}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

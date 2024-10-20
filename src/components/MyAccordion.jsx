import { ChevronLeft } from "@mui/icons-material";
import React, { useState } from "react";

const MyAccordion = ({ heading, defaultState = true, list = [], children }) => {
  const [active, setActive] = useState(defaultState);

  const toggleAccordion = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className={`border-b `}>
      <div
        className="cursor-pointer flex justify-between items-center py-4"
        onClick={toggleAccordion}
      >
        <h6>{heading}</h6>
        <ChevronLeft
          className={` transitional ${active ? "rotate-90" : "-rotate-90"}`}
        />
      </div>
      <div
        className={`flex  px-2 flex-col gap-4 overflow-y-auto  transitional ${
          active ? "h-72 !min-h-max" : "h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MyAccordion;

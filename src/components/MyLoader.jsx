import { CircularProgress } from "@mui/material";
import React from "react";

const MyLoader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );
};

export default MyLoader;

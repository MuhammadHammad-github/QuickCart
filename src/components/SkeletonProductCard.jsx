import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonProductCard = () => {
  return (
    <div className="mx-3">
      <Skeleton variant="rectangular" className="w-full h-full" height={240} />
      <div className="flex flex-col items-center justify-center p-5 gap-2">
        <Skeleton variant="text" sx={{ fontSize: "0.9rem", width: "8rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "0.9rem", width: "4rem" }} />
      </div>
    </div>
  );
};

export default SkeletonProductCard;

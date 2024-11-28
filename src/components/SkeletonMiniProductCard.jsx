import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonMiniProductCard = () => {
  return (
    <div className="rounded-lg border p-5 flex  gap-5">
      <div className="bg-neutral2-800 rounded-lg min-w-max overflow-hidden">
        <Skeleton variant="rectangular" className="" height={80} width={80} />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" sx={{ fontSize: "0.9rem", width: "12rem" }} />
        <div className="flex gap-2 items-center">
          <Skeleton variant="text" sx={{ fontSize: "0.9rem", width: "4rem" }} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonMiniProductCard;

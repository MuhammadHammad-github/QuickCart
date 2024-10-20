import React from "react";

const Hero = ({ heading, path }) => {
  return (
    <div className="w-full bg-neutral2-800 flex items-center justify-center flex-col gap-2 py-10">
      <h3>{heading}</h3>
      <p className="flex items-center gap-3">
        Home <span> &gt;</span>{" "}
        <span className="text-accent-400 font-medium">{path}</span>
      </p>
    </div>
  );
};

export default Hero;

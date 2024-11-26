import React from "react";
import Image from "next/image";

const LoadingBar = () => {
  const parallelogramCount = 11; // Number of parallelograms

  return (
    <div
      style={{
      display: "flex",
      gap: "0.1rem",
      backgroundColor: "#0D0402",
      justifyContent: "center",
      }}
    >
      {Array.from({ length: parallelogramCount }).map((_, index) => (
      <img
        key={index}
        src="/loading.svg"
        alt="loading bar"
        className="w-[9%] h-auto max-w-[5rem]"
      />
      ))}
    </div>
  );
};

export default LoadingBar;

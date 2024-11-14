import React from "react";

function Hexagon() {
  return (
    <div className="relative w-64 h-36">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-lg font-bold">Title</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-sm">Citations</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-sm">Author</p>
      </div>
    </div>
  );
}

export default Hexagon;
import React from "react";

const Button = ({ text, exec }) => {
  return (
    <button
      type="submit"
      onClick={exec}
      className={`group/button mt-5 relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gray-800/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-140 scale-130 hover:shadow-xl hover:shadow-gray-600/50 border border-white/50 hover:cursor-pointer disabled:cursor-not-allowed`}
    >
      <span className="text-lg uppercase">{text}</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
        <div className="relative h-full w-10 bg-white/50"></div>
      </div>
    </button>
  );
};

export default Button;

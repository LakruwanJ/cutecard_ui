import React from "react";

interface CardIconProps {
    count: string; // URL or path for the image
  topic: string; // Title or topic for the card
  details: string; // Details or description for the card
}

const CardIcon: React.FC<CardIconProps> = ({ count, topic }) => {
  return (
      <div className="grid gap-6 p-6 mt-6">
        <div className="overflow-hidden text-center bg-white/60 rounded shadow-md text-slate-500 shadow-slate-200">
          <br /><br />
        <h2 className=" text-xl font-large text-slate-700">{count}</h2>
          <div className="p-3">
            <h2 className="mb-4 text-xl font-large text-slate-700">{topic}</h2>
            {/* <p>{details}</p> */}
            <br />
          </div>
        </div>
      </div>
  );
};

export default CardIcon;

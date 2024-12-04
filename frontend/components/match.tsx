'use client';
import React from 'react';
import Image from 'next/image';

interface MatchProps {
  Team1: string;
  Team2: string;
  initial1: string;
  time: string;
  initial2: string;
}

const Match: React.FC<MatchProps> = ({
  Team1,
  Team2,
  initial1,
  initial2,
  time,
}) => {
  return (
    <div
      className="bg-white bg-opacity-20 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white 
                 flex flex-col md:flex-row items-center justify-center w-full py-5 px-3 md:px-5 gap-3 md:gap-5 lg:gap-10 mt-2 
                 shadow-inner shadow-white hover:cursor-pointer transition-all duration-300"
      onClick={() => {
        localStorage.clear();
        window.location.href = `/PlayerSelection/?match=${initial1} vs ${initial2}`;
      }}
    >
      {/* Team 1 Info */}
      <div className="flex flex-col items-center md:items-start w-full sm:w-[40%] text-center md:text-left">
        <Image
          src={`/teamlogos/${initial1}.svg`}
          width={'72'}
          height={'72'}
          alt="/"
          className="rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
        />
        <div className="flex flex-col space-y-1">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
            {initial1}
          </h3>
          <p className="text-white text-xs sm:text-sm md:text-md">{Team1}</p>
        </div>
      </div>

      {/* Match Time */}
      <p className="text-[#787878] text-xs sm:text-sm md:text-lg lg:text-xl leading-[283.333%] tracking-tight w-full sm:w-[20%] text-center">
        {time}
      </p>

      {/* Team 2 Info */}
      <div className="flex flex-col items-center md:items-end w-full sm:w-[30%] text-center md:text-right">
        <Image
          src={`/teamlogos/${initial2}.svg`}
          width={'72'}
          height={'72'}
          alt="/"
          className="rounded-full h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
        />
        <div className="flex flex-col space-y-1">
          <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
            {initial2}
          </h3>
          <p className="text-white text-xs sm:text-sm md:text-md">{Team2}</p>
        </div>
      </div>
    </div>
  );
};

export default Match;

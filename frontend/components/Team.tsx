'use client';
import React from 'react';
import Image from 'next/image';

interface MatchProps {
  Team: string;
  initial: string;
}

const Match: React.FC<MatchProps> = ({ Team, initial }) => {
  return (
    <div
      className="rounded-xl flex w-full py-5 px-5 sm:px-8 md:px-10 justify-center mt-2 overflow-x-auto hover:cursor-pointer"
      onClick={() => {
        localStorage.clear();
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-white text-2xl sm:text-3xl font-bold leading-[1.5] tracking-[-0.6px] mt-2 sm:mt-3">
          {initial}
        </h3>
        <p className="text-white text-sm sm:text-md leading-[1.5] tracking-[-0.6px]">
          {Team}
        </p>
        <Image
          src={`/teamlogos/${initial}.svg`}
          width={144}
          height={144}
          alt={`${Team} Logo`}
          className="rounded-full h-32 w-32 sm:h-36 sm:w-36 my-6 sm:my-10"
        />
      </div>
    </div>
  );
};

export default Match;

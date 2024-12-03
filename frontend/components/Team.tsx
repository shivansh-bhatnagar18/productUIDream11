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
      className=" rounded-xl flex w-full py-5 px-10 justify-center mt-2 overflow-x-auto hover:cursor-pointer"
      onClick={() => {
        localStorage.clear();
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-white text-3xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
          {initial}
        </h3>
        <p className="text-white text-md leading-[ 283.333%] tracking-[-0.6px]">
          {Team}
        </p>
        <Image
          src={`/teamlogos/${initial}.svg`}
          width={'72'}
          height={'72'}
          alt="/"
          className="rounded-full h-36 w-36 my-10"
        />
      </div>
    </div>
  );
};

export default Match;

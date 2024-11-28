import React, { useEffect } from 'react';

interface PlayerProps {
  imageSrc: string;
  points: number;
  name: string;
  key: number;
  isSelected: boolean;
}

const PlayerComponent = ({ imageSrc, points, name }: PlayerProps) => {
  useEffect(() => {
    console.log(imageSrc);
  });
  return (
    <div className="w-[20%] self-center flex flex-col relative m-2 bg-[#878789] rounded-full">
      <div className="flex flex-col z-100 justify-end items-center ">
        <p className="text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] text-end w-fit px-3 rounded-3xl absolute bottom-3 -right-6">
          {points}
        </p>
        <img src={imageSrc} alt={name} className="rounded-full " />
        <p className="text-sm text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] leading-3 text-center absolute">
          {name}
        </p>
      </div>
    </div>
  );
};

export default PlayerComponent;

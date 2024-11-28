import React from 'react';

interface PlayerProps {
  imageSrc: string;
  number: number;
  name: string;
}

const PlayerComponent = ({ imageSrc, number, name }: PlayerProps) => {
  return (
    <div className="w-[20%] self-center flex flex-col relative m-2 bg-[#878789] rounded-full">
        <div className="flex flex-col z-100 justify-end items-center ">
        <p className="text-4xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] text-end w-fit px-3 rounded-3xl absolute bottom-5 -right-3">{number}</p>
        <img src={imageSrc} alt={name} className="rounded-full " />
        <p className="text-md text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] leading-3 text-center absolute font-bold">{name}</p>
        </div>    
    </div>
  );
};

export default PlayerComponent;
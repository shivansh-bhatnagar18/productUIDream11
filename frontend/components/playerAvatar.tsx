import { init } from 'next/dist/compiled/webpack/webpack';
import React, { useEffect } from 'react';
// import handleAIComparisonClick from '../app/PlayerSelection/page';

interface PlayerProps {
  imageSrc: string;
  points: number;
  name: string;
  key: number;
  team: string;
  isSelected: boolean;
  rowData: any[];
  initial1: string;
  initial2: string;
  // setSelectedRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setCountSelected: React.Dispatch<React.SetStateAction<number>>;
  // setRowData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PlayerComponent = ({
  imageSrc,
  points,
  team,
  name,
  rowData,
  initial1,
  initial2,
  setCountSelected,
}: PlayerProps) => {
  const player = rowData.find((row) => row.name === name);
  return (
    <div
      className="w-[20%] self-center flex flex-col relative m-2"
      onClick={() => {
        setCountSelected(rowData.filter((row) => row.isSelected).length);
        const params = new URLSearchParams({
          match: `${initial1} vs ${initial2}`,
          name: name,
        });
        window.location.href = `/AIComparison/?${params.toString()}`;
        const updatedRowData = rowData.map((row) =>
          row.name === name ? { ...row, toCompare: true } : row
        );
        localStorage.setItem('rowData', JSON.stringify(updatedRowData));
      }}
    >
      <div className="relative flex flex-col z-100 justify-end items-center ">
        <p className="text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0)] text-end w-fit px-3 rounded-3xl absolute bottom-3 -right-6">
          {points}{' '}
        </p>
        {imageSrc && (
          <img
            src={team == '0' ? '/icons/team1.png' : '/icons/team2.png'}
            alt={name}
            className={`w-16 h-16 object-contain ${team == '0' ? 'scale-100' : ''}`}
          />
        )}
        <p className="text-xs rounded-sm text-black bg-white  leading-3 text-center absolute">
          {name}
        </p>
        <div
          className={`absolute rounded-full w-6 h-6 -top-1 -left-0 text-[0.5rem]   items-center justify-center  ${player && player?.isCaptain ? ' bg-yellow-500 flex' : player && player?.isViceCaptain ? 'flex  bg-gray-300' : 'hidden'}`}
        >
          {player && player?.isCaptain
            ? 'C'
            : player && player?.isViceCaptain
              ? 'VC'
              : ''}
        </div>
      </div>
    </div>
  );
};

export default PlayerComponent;

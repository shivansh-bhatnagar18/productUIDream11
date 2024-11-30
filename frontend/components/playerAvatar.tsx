import React, { useEffect } from 'react';
// import handleAIComparisonClick from '../app/PlayerSelection/page';

interface PlayerProps {
  imageSrc: string;
  points: number;
  name: string;
  key: number;
  isSelected: boolean;
  rowData: any[];
  // setSelectedRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setCountSelected: React.Dispatch<React.SetStateAction<number>>;
  initial1: string;
  initial2: string;
  // setRowData: React.Dispatch<React.SetStateAction<any[]>>;
}

const PlayerComponent = ({
  imageSrc,
  points,
  name,
  rowData,
  initial1,
  initial2,
  setCountSelected,
}: PlayerProps) => {
  return (
    <div
      className="w-[20%] self-center flex flex-col relative m-2 bg-[#878789] rounded-full"
      onClick={() => {
        setCountSelected(rowData.filter((row) => row.isSelected).length);
        window.location.href = `/AIComparison?name=${name}&match=${initial1} vs ${initial2}`;
        const updatedRowData = rowData.map((row) =>
          row.name === name ? { ...row, toCompare: true } : row
        );
        localStorage.setItem('rowData', JSON.stringify(updatedRowData));
      }}
    >
      <div className="flex flex-col z-100 justify-end items-cent</div>er ">
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

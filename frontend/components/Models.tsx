'use client';
import React, { useState } from 'react';

function Models(props: any) {
  const { classname } = props;
  const [selectedModel, setSelectedModel] = useState<string>('');

  const models = [
    {
      id: 'highestFantasyPoints',
      label: 'Highest Fantasy Points',
      icon: '/trophy.svg',
    },
    { id: 'highestCeiling', label: 'Highest Ceiling', icon: '/fire.svg' },
    { id: 'highestFloor', label: 'Highest Floor', icon: '/floor.svg' },
    {
      id: 'highestPopularity',
      label: 'Highest Popularity',
      icon: '/popularity.svg',
    },
  ];

  return (
    <div
      className={`flex flex-col w-full h-full justify-center rounded-3xl align-middle bg-[#2E1919] ${classname} border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white`}
    >
      <div className="w-full font-bold text-4xl text-center pb-3 mt-3">
        Models
      </div>
      <div className="flex flex-col">
        {models.map((model) => (
          <div
            key={model.id}
            className={`justify-between items-center  align-middle flex py-4 px-5 mx-4 mb-2 mt-2 gap-3 border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white rounded-xl bg-[#413030] ${
              selectedModel === model.id
                ? 'border-white'
                : 'border-white border-opacity-30'
            }`}
            onClick={() => {
              if (selectedModel === model.id) {
                setSelectedModel(' ');
              } else {
                setSelectedModel(model.id);
              }
            }}
          >
            <img src={model.icon} className="w-8" alt={model.label} />
            <p className="text-md text-center ">{model.label}</p>
            <button
              className={`w-6 h-6 rounded-full border-2 ${
                selectedModel === model.id
                  ? 'bg-[#FFFFFF]'
                  : 'bg-transparent border-white'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Models;

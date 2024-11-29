'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  PieChart,
  Pie,
} from 'recharts';

const data01 = [
  {
    name: 'Group A',
    value: 400,
  },
  {
    name: 'Group B',
    value: 300,
  },
  {
    name: 'Group C',
    value: 300,
  },
  {
    name: 'Group D',
    value: 200,
  },
  {
    name: 'Group E',
    value: 278,
  },
  {
    name: 'Group F',
    value: 189,
  },
];

const data = [
  {
    name: 'Percentage',
    uv: 100,
    pv: 2400,
    fill: 'transparent',
  },
  {
    name: 'Percentage',
    uv: 72,
    pv: 4567,
    fill: '#34C759',
  },
];

const PlayerStats = (props: any) => {

  const {classname} = props
  
  return (
    <div className= {`bg-gray-600 bg-opacity-10 border-y-2 border-gray-600 border-opacity-60 flex flex-col w-full ${classname}`}>
      <div className= "w-auto h-[20%] mx-3 mt-3 flex gap-2" >
        <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Batting First</p>
          <div className='flex w-full mb-2 mt-2'>
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">24</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">FPts</p>
          </div>
        </div>
        <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Chasing</p>
          <div className='flex w-full mb-2 mt-2'>
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">91</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">FPts</p>
          </div>
        </div>
        <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Strike Rate</p>
          <div className='flex w-full mb-2 mt-2'>
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">64</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">FPts</p>
          </div>
        </div>
        <div className="bg-[#312D2C] w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Economy Rate</p>
          <div className='flex w-full mb-2 mt-2'>
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">83</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">FPts</p>
          </div>
        </div>
      </div>
      <div className=" w-auto h-[60%] m-3 rounded-2xl flex gap-2">
        <div className="w-[60%] rounded-xl flex flex-col gap-2">
          <div className="bg-[#312D2C] mt-1 mr-2 h-[50%] rounded-xl flex flex-col">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 mb-2 font-bold pl-3">
              Pitch Performance Prediction
            </p>
            <RadialBarChart
              width={200}
              height={100}
              outerRadius="80%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                label={{ fill: '#666', position: 'insideStart' }}
                background
                dataKey="uv"
              />
            </RadialBarChart>
          </div>
          <div className="bg-[#312D2C] h-[50%] mt-2 mr-2 rounded-2xl flex flex-col pb-3">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 mb-2 font-bold pl-3">Relative FPts</p>
            <PieChart width={200} height={100}>
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#34C759"
              />
              {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
            </PieChart>
          </div>
        </div>
        <div className="w-full h-auto rounded-xl mt-1 flex flex-col gap-2">
          <div className="bg-[#312D2C] h-full rounded-2xl flex gap-2">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 font-bold pl-2">
              Performance Prediction
            </p>
          </div>
          <div className=" rounded-xl flex gap-2">
            <div className="bg-[#312D2C] w-full  justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">Ceil Fpts</p>
              <p className="text-[#E4DAD7] text-center text-5xl font-bold">5</p>
            </div>
            <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">Floor Fpts</p>
              <p className="text-[#E4DAD7] text-center text-5xl font-bold">5</p>
            </div>
            <div className="bg-[#312D2C] w-full mt-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-4 mt-2 mb-2">Risk</p>
              <p className="text-white mx-4 rounded-[3px] text-center text-2xl bg-[#D83D3D] font-bold mb-2 px-7 ">High</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#312D2C] w-auto h-[30%] mb-3 mt-1 mx-3 rounded-2xl flex flex-col gap-2">
        <p className="text-[#E4DAD7] text-lg ml-9 mt-2">Alerts</p>
        <ul className=' ml-20 mb-4 list-disc'>
          <li>Player X scored a brilliant century. but met with an accident. </li>
          <li> Player X praised for his match-winning performance.</li>
          <li>Player X faces fitness concerns ahead of the next match.</li>
        </ul>
      </div>
    </div>
  );
};

export default PlayerStats;

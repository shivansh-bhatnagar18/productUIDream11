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
import { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

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

const databar = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const PlayerStats = () => {

  const [alert, setAlert] = useState<string>('');
  useEffect(() => {
    setAlert('Player X scored a brilliant century, but met with an accident.\nPlayer X praised for his match-winning performance.\nPlayer X faces fitness concerns ahead of the next match.');
  }, []);
  return (
    <div className="bg-white bg-opacity-10 rounded-xl border-2 border-white flex flex-col w-full">
      <div className=" w-auto h-[20%] mx-3 mt-3 rounded-xl flex gap-2">
        <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
          <p className="text-white text-lg ml-2 mt-2">Batting First</p>
          <p className="text-white text-5xl font-bold ml-2">30</p>
        </div>
        <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
          <p className="text-white text-lg ml-2 mt-2">Chasings</p>
          <p className="text-white text-5xl font-bold ml-2">30</p>
        </div>
        <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
          <p className="text-white text-lg ml-2 mt-2">Strike Rate</p>
          <p className="text-white text-5xl font-bold ml-2">30</p>
        </div>
        <div className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col">
          <p className="text-white text-lg ml-2 mt-2">Economy Rate</p>
          <p className="text-white text-5xl font-bold ml-2">30</p>
        </div>
      </div>
      <div className=" w-auto h-[60%] m-3 rounded-xl flex gap-2">
        <div className="w-[30%] rounded-xl flex flex-col gap-2">
          <div className="bg-white bg-opacity-20 h-[50%] rounded-xl flex flex-col">
            <p className="text-white text-lg ml-2 mt-2">
              Pitch Performance Prediction
            </p>
            <RadialBarChart
              width={200}
              height={100}
              innerRadius="10%"
              outerRadius="80%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                minAngle={15}
                label={{ fill: '#666', position: 'insideStart' }}
                background
                clockWise={true}
                dataKey="uv"
              />
              <Legend
                iconSize={10}
                width={120}
                height={140}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
              <Tooltip />
            </RadialBarChart>
          </div>
          <div className="bg-white bg-opacity-20 h-[50%] rounded-xl flex flex-col">
            <p className="text-white text-lg ml-2 mt-2">Relative FPts</p>
            <PieChart width={200} height={100}>
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#36D25D"
              />
              {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
            </PieChart>
          </div>
        </div>
        <div className="w-[70%] rounded-xl flex flex-col gap-2">
          <div className="bg-white bg-opacity-20 h-[65%] rounded-xl flex flex-col gap-2">
            <p className="text-white text-lg ml-2 mt-2">
              Performance Prediction
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={databar}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" stroke="white"/>
                <YAxis stroke="white"/>
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#67B402" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="uv" fill="#367CEA" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
                </div>
          <div className="h-[35%] rounded-xl flex gap-2">
            <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col">
              <p className="text-white text-lg ml-2 mt-2">Ceil Fpts</p>
              <p className="text-white text-5xl font-bold ml-2">30</p>
            </div>
            <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col">
              <p className="text-white text-lg ml-2 mt-2">Floor Fpts</p>
              <p className="text-white text-5xl font-bold ml-2">30</p>
            </div>
            <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col">
              <p className="text-white text-lg ml-2 mt-2">Risk</p>
              <p className="text-white text-5xl font-bold ml-2">30</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-20 w-auto h-[30%] mb-3 mx-3 rounded-xl flex flex-col gap-2">
        <div className='flex justify-between my-5'>
          <div className="text-white text-lg ml-2 mt-2">Alerts</div>
          <VolumeUpIcon className='mr-5'/>
        </div>
        <p className="text-white text-md ml-2">{alert}</p>
      </div>
    </div>
  );
};

export default PlayerStats;

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
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
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

const PlayerStats = (props: any) => {
  const { classname } = props;

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

  const [alert, setAlert] = useState<string>('');

  useEffect(() => {
    setAlert(
      'Player X scored a brilliant century, but met with an accident.\nPlayer X praised for his match-winning performance.\nPlayer X faces fitness concerns ahead of the next match.'
    );
  }, []);

  const handleSpeakerClick = () => {
    if (!alert) {
      return;
    }

    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(alert);
    utterThis.rate = 1;
    utterThis.pitch = 1;
    utterThis.lang = 'hi-IN';

    synth.speak(utterThis);
  };

  return (
    <div
      className={`bg-gray-600 bg-opacity-10 border-y-2 border-gray-600 border-opacity-60 flex flex-col w-full ${classname}`}
    >
      <div className="w-auto h-[20%] mx-3 mt-3 flex gap-2">
        <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Batting First</p>
          <div className="flex w-full mb-2 mt-2">
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">24</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
              FPts
            </p>
          </div>
        </div>
        <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Chasing</p>
          <div className="flex w-full mb-2 mt-2">
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">91</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
              FPts
            </p>
          </div>
        </div>
        <div className="bg-[#312D2C] mr-2 w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Strike Rate</p>
          <div className="flex w-full mb-2 mt-2">
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">64</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
              FPts
            </p>
          </div>
        </div>
        <div className="bg-[#312D2C] w-[25%] rounded-2xl flex flex-col">
          <p className="text-[#E4DAD7] text-lg ml-5 mt-2">Economy Rate</p>
          <div className="flex w-full mb-2 mt-2">
            <p className="text-[#E4DAD7] text-5xl font-bold ml-5 mr-4">83</p>
            <p className="text-[#FFA18D] text-md text-center items-center flex font-thin">
              FPts
            </p>
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
                // minAngle={15}
                label={{ fill: '#666', position: 'insideStart' }}
                background
                // clockWise={true}
                dataKey="uv"
              />
            </RadialBarChart>
          </div>
          <div className="bg-[#312D2C] h-[50%] mt-2 mr-2 rounded-2xl flex flex-col pb-3">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 mb-2 font-bold pl-3">
              Relative FPts
            </p>
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
        <div className="w-full h-auto rounded-xl mt-1 flex flex-col gap-2">
          <div className="bg-[#312D2C] h-full rounded-2xl flex flex-col gap-2">
            <p className="text-[#E4DAD7] text-lg ml-2 mt-2 font-bold pl-2">
              Performance Prediction
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
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
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#367CEA"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#67B402" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className=" rounded-xl flex gap-2">
            <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">
                Ceil Fpts
              </p>
              <p className="text-[#E4DAD7] text-center text-5xl font-bold">5</p>
            </div>
            <div className="bg-[#312D2C] w-full justify-center align-middle mt-2 mr-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-center text-lg mx-3">
                Floor Fpts
              </p>
              <p className="text-[#E4DAD7] text-center text-5xl font-bold">5</p>
            </div>
            <div className="bg-[#312D2C] w-full mt-2 rounded-2xl flex flex-col">
              <p className="text-[#E4DAD7] text-lg ml-4 mt-2 mb-2">Risk</p>
              <p className="text-white mx-4 rounded-[3px] text-center text-2xl bg-[#D83D3D] font-bold mb-2 px-7 ">
                High
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#312D2C] w-auto h-[30%] mb-3 mt-1 mx-3 rounded-2xl flex flex-col gap-2">
        <div className="flex flex-col justify-between my-5">
          <div className="flex justify-between">
            <div className="text-white text-lg ml-9">Alerts</div>
            <VolumeUpIcon className="mr-5" onClick={handleSpeakerClick} />
          </div>
          {alert.split('\n').map((line, index) => (
            <p className="text-white text-md ml-20">{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;

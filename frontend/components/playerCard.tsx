'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

interface PlayerCardProps {
  playerName: string;
  rank: number;
}

const readCSVImageData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch('/names.csv')
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results: Papa.ParseResult<any>) => {
            resolve(results.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
      })
      .catch((error) => reject(error));
  });
};

const data = [
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

const PlayerCard = ({ playerName, rank }: PlayerCardProps) => {
  const [playerPosition, setPlayerPosition] = useState('Unknown Position');
  const [playerBattingStyle, setPlayerBattingStyle] = useState(
    'Unknown Batting Style'
  );
  const [playerBowlingStyle, setPlayerBowlingStyle] = useState(
    'Unknown Bowling Style'
  );
  const [playerImgSrc, setPlayerImgSrc] = useState('/default-image-path.jpg');
  const [playerCountry, setPlayerCountry] = useState('Unknown Country');

  useEffect(() => {
    readCSVImageData().then((imageData) => {
      const playerImage = imageData.find((img) => img.Name === playerName);
      setPlayerImgSrc(playerImage.image_path);
      const playerPosition = imageData.find((img) => img.Name === playerName);
      setPlayerPosition(playerPosition.position);
      const playerBattingStyle = imageData.find(
        (img) => img.Name === playerName
      );
      setPlayerBattingStyle(playerBattingStyle.battingstyle);
      const playerBowlingStyle = imageData.find(
        (img) => img.Name === playerName
      );
      setPlayerBowlingStyle(playerBowlingStyle.bowlingstyle);
      const playerCountry = imageData.find((img) => img.Name === playerName);
      setPlayerCountry(playerCountry.country_name);
    });
    console.log(playerImgSrc);
  }, [playerName]);

  return (
    <div className="bg-white bg-opacity-10 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white max-w-80">
      <div className="bg-gradient-to-tr from-black from-10% via-[#1B0303] via-30% to-[#411308] to-90% w-auto h-[30%] m-3 rounded-xl flex gap-2">
        <img
          src={playerImgSrc}
          alt="player"
          className="w-[45%] h-[90%] rounded-xl"
        />
        <div className="flex flex-col text-center justify-center gap-2">
          <div className="flex flex-col justify-center">
            <p className="text-white text-xl font-bold">{playerName}</p>
            <p className="text-white text-left font-bold text-xs">
              {playerPosition}|{playerBattingStyle}|{playerBowlingStyle}
            </p>
          </div>
          <div className='flex justify-between'>
            <p className="text-white text-sm text-left font-bold">{playerCountry}</p>
            <div className='flex flex-col text-right pr-4 pb-2'>
            <p className="text-white text-4xl font-bold">{rank}</p>
            <p className="text-white text-xs ">Matchup rank</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-20 w-auto h-[60%] m-3 rounded-xl p-3">
        <p className="text-white text-md font-bold">FPts Prediction</p>
        <p className="text-white text-2xl font-bold">30</p>
        <AreaChart
          width={250}
          height={150}
          data={data}
          margin={{ top: 20, right: 10, left: -15, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFA18D" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFA18D" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#Fff" />
          <YAxis stroke="#FFf" />
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#FFA18D"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default PlayerCard;

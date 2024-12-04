'use client';
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { PlayerData } from './playerStats';
import { ResponsiveContainer } from 'recharts';
interface PlayerCardProps {
  playerName: string;
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

const thunder = '/image 76.svg';

const PlayerCard = ({ playerName }: PlayerCardProps) => {
  const [playerPosition, setPlayerPosition] = useState('Unknown Position');
  const [playerBattingStyle, setPlayerBattingStyle] = useState(
    'Unknown Batting Style'
  );
  const [playerBowlingStyle, setPlayerBowlingStyle] = useState(
    'Unknown Bowling Style'
  );
  const [playerImgSrc, setPlayerImgSrc] = useState('/default-image-path.jpg');
  const [playerCountry, setPlayerCountry] = useState('Unknown Country');
  const [rank, setRank] = useState(0);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [rowData, setRowData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([
    { name: 'Match 1', y_pred: 0 },
    { name: 'Match 2', y_pred: 0 },
    { name: 'Match 3', y_pred: 0 },
    { name: 'Match 4', y_pred: 0 },
    { name: 'Match 5', y_pred: 0 },
    { name: 'Match 6', y_pred: 0 },
  ]);

  useEffect(() => {
    readCSVImageData().then((imageData) => {
      const playerInfo = imageData.find((img) => img.Name === playerName);
      if (playerInfo) {
        setPlayerImgSrc(
          playerInfo.image_path.trim() || '/default-image-path.jpg'
        );
        setPlayerPosition(playerInfo.position || 'Unknown Position');
        setPlayerBattingStyle(
          playerInfo.battingstyle || 'Unknown Batting Style'
        );
        setPlayerBowlingStyle(
          playerInfo.bowlingstyle || 'Unknown Bowling Style'
        );
        setPlayerCountry(playerInfo.country_name || 'Unknown Country');
      }
    });
  }, [playerName]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('rowData') || '[]');
    setRowData(data);
  }, []);
  useEffect(() => {
    const player = rowData.find((player: any) => player.name === playerName);
    if (player) {
      console.log('Found player data:', player);
      setPlayerData(player);
    }
  }, [rowData, playerName]);

  useEffect(() => {
    if (playerData && playerData.values) {
      setRank(playerData.values.rank || 0);
      updateDatabar(playerData.values.y_pred || []);
    }
  }, [playerData]);

  const updateDatabar = (y_pred: number[]) => {
    const updatedDatabar = data.map((item, index) => ({
      ...item,
      y_pred: y_pred[index] || 0,
    }));
    setData(updatedDatabar);
    return updatedDatabar;
  };
  console.log('PlayerData:', playerData);
  return (
    <div className="bg-white bg-opacity-10 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white max-w-80 min-w-80">
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
              {playerPosition} | {playerBattingStyle} | {playerBowlingStyle}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-white text-sm text-left font-bold">
              {playerCountry}
            </p>
            <div className="flex flex-col text-right pr-4 pb-2">
              <div className="flex">
                <img src={thunder} alt="thunder" className=" w-[50%] h-[80%]" />
                <p className="text-white text-4xl font-bold">{rank}</p>
              </div>
              <p className="text-white text-xs ">Matchup rank</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-20 w-auto h-[60%] m-3 rounded-xl p-3">
        <p className="text-white text-md font-bold">FPts Prediction</p>
        <p className="text-white text-2xl font-bold">
          {Math.round(playerData?.values.y_pred[5] as number)}
        </p>
        <div className="w-full h-40">
          {/* Responsive Container to auto-scale */}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFA18D" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FFA18D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#FFF" />
              <YAxis stroke="#FFF" dataKey="y_pred" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="y_pred"
                stroke="#FFA18D"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;

'use client';
import { Button } from '@mui/material';
import 'ag-grid-enterprise';
import Navbar from '@/components/navbar';
import Transaction from '@/components/Transaction';
import Models from '@/components/Models';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Heatmap } from '@mui/x-charts-pro/Heatmap';
import Image from 'next/image';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
} from 'recharts';
import AddTable from '@/components/AddTable';
import RemoveTable from '@/components/RemoveTable';
import ChatbotWrapper from '@/components/chatbot/ChatBotWrapper';

const data_highestFantasyPoints = [
  {
    subject: 'Predicted Fantasy Points Per Player',
    A: 120,
    B: 80,
    fullMark: 100,
  },
  {
    subject: 'Fielding Efficiency Score',
    A: 98,
    B: 60,
    fullMark: 100,
  },
  {
    subject: 'Predicted Contribution Balance',
    A: 86,
    B: 40,
    fullMark: 100,
  },
  {
    subject: 'Bowling Economy',
    A: 99,
    B: 70,
    fullMark: 100,
  },
  {
    subject: 'Death Over Impact',
    A: 85,
    B: 50,
    fullMark: 100,
  },
  {
    subject: 'Versatility Index',
    A: 65,
    B: 30,
    fullMark: 100,
  },
];

const data_highestCeiling = [
  {
    subject: 'Predicted Fantasy Points Per Player',
    A: 150,
    B: 50,
    fullMark: 100,
  },
  {
    subject: 'Fielding Efficiency Score',
    A: 130,
    B: 40,
    fullMark: 100,
  },
  {
    subject: 'Predicted Contribution Balance',
    A: 110,
    B: 30,
    fullMark: 100,
  },
  {
    subject: 'Bowling Economy',
    A: 120,
    B: 60,
    fullMark: 100,
  },
  {
    subject: 'Death Over Impact',
    A: 100,
    B: 20,
    fullMark: 100,
  },
  {
    subject: 'Versatility Index',
    A: 80,
    B: 10,
    fullMark: 100,
  },
];

const data_highestFloor = [
  {
    subject: 'Predicted Fantasy Points Per Player',
    A: 100,
    B: 150,
    fullMark: 100,
  },
  {
    subject: 'Fielding Efficiency Score',
    A: 90,
    B: 140,
    fullMark: 100,
  },
  {
    subject: 'Predicted Contribution Balance',
    A: 80,
    B: 130,
    fullMark: 100,
  },
  {
    subject: 'Bowling Economy',
    A: 70,
    B: 120,
    fullMark: 100,
  },
  {
    subject: 'Death Over Impact',
    A: 60,
    B: 110,
    fullMark: 100,
  },
  {
    subject: 'Versatility Index',
    A: 50,
    B: 100,
    fullMark: 100,
  },
];

const data_highestPopularity = [
  {
    subject: 'Predicted Fantasy Points Per Player',
    A: 140,
    B: 90,
    fullMark: 100,
  },
  {
    subject: 'Fielding Efficiency Score',
    A: 130,
    B: 80,
    fullMark: 100,
  },
  {
    subject: 'Predicted Contribution Balance',
    A: 120,
    B: 70,
    fullMark: 100,
  },
  {
    subject: 'Bowling Economy',
    A: 110,
    B: 60,
    fullMark: 100,
  },
  {
    subject: 'Death Over Impact',
    A: 100,
    B: 50,
    fullMark: 100,
  },
  {
    subject: 'Versatility Index',
    A: 90,
    B: 40,
    fullMark: 100,
  },
];
const data01_highestFantasyPoints = [
  { x: 100, y: 200, z: 200 }, // High risk, high reward
  { x: 120, y: 100, z: 260 }, // High risk, low reward
  { x: 170, y: 300, z: 400 }, // Low risk, high reward
  { x: 140, y: 250, z: 280 }, // Low risk, high reward
  { x: 150, y: 400, z: 500 }, // Low risk, high reward
  { x: 110, y: 280, z: 200 }, // Low risk, high reward
  { x: 130, y: 150, z: 300 }, // High risk, low reward
  { x: 160, y: 350, z: 450 }, // Low risk, high reward
  { x: 180, y: 100, z: 100 }, // High risk, low reward
  { x: 190, y: 200, z: 200 }, // High risk, high reward
  { x: 200, y: 300, z: 300 }, // Low risk, high reward
];

const data02_highestCeiling = [
  { x: 200, y: 300, z: 300 }, // Low risk, high reward
  { x: 220, y: 200, z: 360 }, // High risk, high reward
  { x: 270, y: 400, z: 500 }, // Low risk, high reward
  { x: 240, y: 350, z: 380 }, // Low risk, high reward
  { x: 250, y: 500, z: 600 }, // Low risk, high reward
  { x: 210, y: 380, z: 300 }, // Low risk, high reward
  { x: 230, y: 150, z: 300 }, // High risk, low reward
  { x: 260, y: 350, z: 450 }, // Low risk, high reward
  { x: 280, y: 100, z: 100 }, // High risk, low reward
  { x: 290, y: 200, z: 200 }, // High risk, high reward
  { x: 300, y: 300, z: 300 }, // Low risk, high reward
];

const data03_highestFloor = [
  { x: 300, y: 400, z: 400 }, // Low risk, high reward
  { x: 320, y: 300, z: 460 }, // High risk, high reward
  { x: 370, y: 500, z: 600 }, // Low risk, high reward
  { x: 340, y: 450, z: 480 }, // Low risk, high reward
  { x: 350, y: 600, z: 700 }, // Low risk, high reward
  { x: 310, y: 480, z: 400 }, // Low risk, high reward
  { x: 330, y: 150, z: 300 }, // High risk, low reward
  { x: 360, y: 350, z: 450 }, // Low risk, high reward
  { x: 380, y: 100, z: 100 }, // High risk, low reward
  { x: 390, y: 200, z: 200 }, // High risk, high reward
  { x: 400, y: 300, z: 300 }, // Low risk, high reward
];

const data04_highestPopularity = [
  { x: 400, y: 500, z: 500 }, // Low risk, high reward
  { x: 420, y: 400, z: 560 }, // High risk, high reward
  { x: 470, y: 600, z: 700 }, // Low risk, high reward
  { x: 440, y: 550, z: 580 }, // Low risk, high reward
  { x: 450, y: 700, z: 800 }, // Low risk, high reward
  { x: 410, y: 580, z: 500 }, // Low risk, high reward
  { x: 430, y: 150, z: 300 }, // High risk, low reward
  { x: 460, y: 350, z: 450 }, // Low risk, high reward
  { x: 480, y: 100, z: 100 }, // High risk, low reward
  { x: 490, y: 200, z: 200 }, // High risk, high reward
  { x: 500, y: 300, z: 300 }, // Low risk, high reward
];

function Page() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [initial1, setInitial1] = useState<string>('');
  const [initial2, setInitial2] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>(
    'highestFantasyPoints'
  );

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('rowData') || '[]');
    setRowData(playerData);
    if (typeof window !== 'undefined') {
      const match = new URLSearchParams(window.location.search).get('match') as string;
      const [team1, team2] = match.split(' vs ');
      setInitial1(team1);
      setInitial2(team2);
    }
  }, []);

  const handleRowClick = (key: number) => {
    const selectedPlayers = rowData.filter((row) => row.isSelected);
    const clickedRow = rowData.find((row) => row.key === key);

    if (clickedRow) {
      if (!clickedRow.isSelected) {
        // Trying to add a player
        if (selectedPlayers.length >= 11) {
          // Cannot add more than 11 players
          alert('You can select up to 11 players only.');
          return;
        }
      }
      // Toggle isSelected
      const updatedRowData = rowData.map((row) => {
        if (row.key === key) {
          return { ...row, isSelected: !row.isSelected };
        }
        return row;
      });
      setRowData(updatedRowData);
      localStorage.setItem('rowData', JSON.stringify(updatedRowData));
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#0D0402] overflow-clip min-h-screen max-w-screen min-w-screen">
      <Navbar />
      <div className="flex justify-center text-5xl gap-5">
        Dream Team Analyser
      </div>
      <div className="flex w-[95%] mt-10 gap-5">
        <div className="flex flex-wrap gap-5">
          <div className="w-full h-80 justify-center items-center border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white rounded-3xl p-9 bg-[#2A1A1A]">
            <div className="h-full flex border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white rounded-2xl bg-[#3E3030]">
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={
                      selectedModel === 'highestFantasyPoints'
                        ? data_highestFantasyPoints
                        : selectedModel === 'highestCeiling'
                          ? data_highestCeiling
                          : selectedModel === 'highestFloor'
                            ? data_highestFloor
                            : data_highestPopularity
                    }
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Mike"
                      dataKey="A"
                      stroke="#D83D3D"
                      fill="#D83D3D"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full h-full items-center justify-center flex relative">
                <Image
                  src="/heat.png"
                  alt="heatmap"
                  width={300}
                  height={400}
                  className="absolute"
                />
                <ScatterChart
                  width={380}
                  height={250}
                  className="absolute -ml-12 -mb-6"
                >
                  <XAxis
                    dataKey="x"
                    type="number"
                    name="Risk"
                    unit=""
                    stroke="white"
                  />
                  <YAxis
                    dataKey="y"
                    type="number"
                    name="Reward"
                    unit=""
                    stroke="white"
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter
                    name="Players"
                    data={
                      selectedModel === 'highestFantasyPoints'
                        ? data01_highestFantasyPoints
                        : selectedModel === 'highestCeiling'
                          ? data02_highestCeiling
                          : selectedModel === 'highestFloor'
                            ? data03_highestFloor
                            : data04_highestPopularity
                    }
                    fill="#fff"
                  />
                </ScatterChart>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-5">
            <div className="flex w-full justify-around">
              <p className="h-fit text-4xl font-bold">Add</p>
              <p className="h-fit text-4xl font-bold">Drop</p>
            </div>
            <div className="w-full h-full max-h-[400px] flex gap-5">
              <AddTable
                rowData={rowData.filter((row) => !row.isSelected)}
                onRowClick={handleRowClick}
                selectionLimitReached={rowData.filter((row) => row.isSelected).length >= 11}
              />
              <RemoveTable
                rowData={rowData.filter((row) => row.isSelected)}
                onRowClick={handleRowClick}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Models
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            classname=""
          />
          <Transaction />
        </div>
      </div>

      <div className="flex items-center w-full mt-28 justify-center ">
        <Button
          type="button"
          variant="contained"
          className="mt-10 mr-7 focus:border-2 text-[#525E74] hover:bg-[#959595] focus:border-[#525E74] focus:border-solid bg-[#B0AFAF] font-bold rounded-md"
          onClick={() => {
            window.location.href = `/PlayerSelection?match=${initial1} vs ${initial2}`;
          }}
        >
          Next
        </Button>
        <Button
          type="button"
          variant="contained"
          className="mt-10 mr-7 focus:border-2 text-[#000] hover:bg-[#959595] focus:border-[#525E74] focus:border-solid bg-[#34C759] font-bold rounded-md"
          onClick={() => {
            window.location.href = `/PlayerSelection?match=${initial1} vs ${initial2}`;
          }}
        >
          Preview
        </Button>
      </div>
      <ChatbotWrapper />
    </div>
  );
}

export default Page;

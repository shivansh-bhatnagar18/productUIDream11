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
import AnalysisTable from '@/components/AnalysisTable';
import ChatbotWrapper from '@/components/chatbot/ChatBotWrapper';

const data = [
  {
    subject: 'Predicted Fantasy Points Per Player',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Fielding Efficiency Score',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Predicted Contribution Balance',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: '',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Death Over Impact',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'Versatility Index',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

const data01 = [
  {
    x: 100,
    y: 200,
    z: 200,
  },
  {
    x: 120,
    y: 100,
    z: 260,
  },
  {
    x: 170,
    y: 300,
    z: 400,
  },
  {
    x: 140,
    y: 250,
    z: 280,
  },
  {
    x: 150,
    y: 400,
    z: 500,
  },
  {
    x: 110,
    y: 280,
    z: 200,
  },
];

function page() {
  const [rowData, setRowData] = useState<any[]>([]);
  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('rowData') || '[]');
    setRowData(playerData);
  }, []);

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
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
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
                  width={360}
                  height={250}
                  className="absolute -ml-16 -mb-6"
                >
                  <XAxis
                    dataKey="x"
                    type="number"
                    name="stature"
                    unit="cm"
                    stroke="white"
                  />
                  <YAxis
                    dataKey="y"
                    type="number"
                    name="weight"
                    unit="kg"
                    stroke="white"
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="A school" data={data01} fill="#8884d8" />
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
              <AnalysisTable rowData={rowData} />
              <AnalysisTable rowData={rowData} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Models />
          <Transaction />
        </div>
      </div>

      <div className="flex items-center w-full mt-28 justify-center ">
        <Button
          type="button"
          variant="contained"
          className="mt-10 mr-7 focus:border-2 text-[#525E74] hover:bg-[#959595] focus:border-[#525E74] focus:border-solid bg-[#B0AFAF] font-bold rounded-md"
          onClick={() => {
            window.location.href = '/PlayerSelection';
          }}
        >
          Next
        </Button>
        <Button
          type="button"
          variant="contained"
          className="mt-10 mr-7 focus:border-2 text-[#000] hover:bg-[#959595] focus:border-[#525E74] focus:border-solid bg-[#34C759] font-bold rounded-md"
        >
          Preview
        </Button>
      </div>
      <ChatbotWrapper />
    </div>
  );
}

export default page;

'use client';
import { Button } from '@mui/material';
import Link from 'next/link';
import 'ag-grid-enterprise';
import Navbar from '@/components/navbar';
import Transaction from '@/components/Transaction';
import Models from '@/components/Models';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import AnalysisTable from '@/components/AnalysisTable';

const data = [
  {
    subject: ' Predicted Fantasy Points Per Player',
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

const readCSVData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch('/data.csv')
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

function page() {
  const [rowData, setRowData] = useState<any[]>([]);
  useEffect(() => {
    readCSVData().then((data) => {
      readCSVImageData().then((imageData) => {
        const playerData = data.map((row: any, index: number) => {
          const playerImage = imageData.find(
            (img) => img.Name === row['Predicted Player 1']
          );
          return {
            key: index,
            name: row['Predicted Player 1'],
            points: row['Predicted Player 1 Points'],
            imageSrc: playerImage ? playerImage.image_path : '',
          };
        });
        setRowData(playerData);
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402] overflow-clip min-h-screen max-w-screen min-w-screen">
      <Navbar />
      <div className="flex justify-center text-5xl gap-5">
        Dream Team Analyser
      </div>
      <div className="flex w-[95%] mt-10 gap-5">
        <div className="flex flex-wrap gap-5">
          <div className="w-full h-80 justify-center items-center border-white border-[1px] border-solid border-opacity-5 rounded-3xl p-9 bg-[#2A1A1A]">
            <div className="h-full flex border-[1px] border-white border-solid border-opacity-5 rounded-2xl bg-[#3E3030]">
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
          Preview
        </Button>
        <Button
          type="button"
          variant="contained"
          className="mt-10 mr-7 focus:border-2 text-[#525E74] hover:bg-[#959595] focus:border-[#525E74] focus:border-solid bg-[#B0AFAF] font-bold rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default page;

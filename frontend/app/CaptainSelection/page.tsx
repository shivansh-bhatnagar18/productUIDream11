'use client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import SearchDropdown from "../../components/searchDropdown";
import { Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import LoadingBar from '@/components/LoadingBar';
import Field from '@/components/field';
import PlayerTable from '@/components/playerTable';
import 'ag-grid-enterprise';
import Navbar from '@/components/navbar';
import PlayerCard from '@/components/playerCard';
import PlayerStats from '@/components/playerStats';
import CaptainTable from '@/components/captainTable';
import Header from '@/components/header';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';

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
            imgSrc: playerImage ? playerImage.image_path : '',
            isCSelected: false,
            isVCSelected: false,
          };
        });
        setRowData(playerData);
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-h-screen max-w-screen min-w-screen">
      <Header />
      {/* team selection divs */}
      {/* <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count =  {countSelected}/>
      </div> */}
      <div className="flex w-[95%] mt-10 gap-5">
        <PlayerCard playerName="Virat Kohli" rank={1} />
        {/* <div className="h-[30%] w-[30%]"></div> */}
        <CaptainTable rowData={rowData} />
        {/* <PlayerTable /> */}
        <PlayerCard playerName="Rohit Sharma" rank={2} />
      </div>
      <div className="bg-white bg-opacity-10 rounded-xl border-2 border-white p-10 flex flex-col items-center mt-24">
        <p className="text-white text-2xl mb-10">
          Here are our top 3 recommendations
        </p>
        <div className="flex gap-10">
          <PlayerCard playerName="Virat Kohli" rank={1} />
          <PlayerCard playerName="Rohit Sharma" rank={2} />
          <PlayerCard playerName="Jasprit Bumrah" rank={3} />
          <div />
        </div>
        <div className="flex flex-row justify-center mt-10">
          <Button
            type="button"
            variant="contained"
            color="primary"
            className=""
          >
            Save
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className=""
          >
            Custom
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;

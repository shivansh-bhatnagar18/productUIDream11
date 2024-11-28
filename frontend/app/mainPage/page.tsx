'use client';
import { Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import LoadingBar from '@/components/LoadingBar';
import Field from '@/components/field';
import PlayerTable from '@/components/playerTable';
import 'ag-grid-enterprise';
import Navbar from '@/components/navbar';
import Header from '@/components/header';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import BattingFirstModal from '@/components/battingFirstModal';

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

export default function Mainpage() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any[]>([]);
  const [countSelected, setCountSelected] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
            isSelected: false,
          };
        });
        setRowData(playerData);
        const count = playerData.filter((player) => player.isSelected).length;
        setCountSelected(count);
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-h-screen max-w-screen min-w-screen">
      <Header />
      {/* team selection divs */}
      <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count={countSelected} />
      </div>
      <div className="flex flex-row gap-4 m-10 w-[95%] grow">
        <PlayerTable rowData={rowData} setSelectedRowData={setSelectedRowData} setCountSelected={setCountSelected}/>
        <Field players={selectedRowData}/>
      </div>
      <div className="flex flex-row gap-4">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="bg-[#525E74]"
        >
          Analyse My Pick
        </Button>
        <BattingFirstModal />
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className="bg-[#525E74]"
          onClick={() => (window.location.href = '/AIComparison')}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

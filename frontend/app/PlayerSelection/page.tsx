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
import { url } from 'inspector';
import { get } from 'http';

export const readCSVData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const match = new window.URLSearchParams(window.location.search).get(
      'match'
    );
    const getMatch = () => {
      switch (match) {
        case 'CSK vs PW':
          return '1';
        case 'AUS vs PAK':
          return '2';
        case 'ENG vs SA':
          return '3';
        default:
          return -1;
      }
    };
    if (getMatch() === -1) {
      reject('Invalid match');
      window.location.href = '/'; // navigate to error page!
      // add error popup here
    }
    const idx = getMatch();
    fetch(`/file_${idx}.csv`)
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

export default function Page() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<any[]>([]);
  const [countSelected, setCountSelected] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [toComparePlayer, setToComparePlayer] = useState<any | null>(null);
  const [initial1, setInitial1] = useState<string>('');
  const [initial2, setInitial2] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = new URLSearchParams(window.location.search).get(
        'match'
      ) as string;
      const [team1, team2] = match.split(' vs ');
      setInitial1(team1);
      setInitial2(team2);
    }
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAIComparisonClick = () => {
    localStorage.setItem('rowData', JSON.stringify(rowData));
    localStorage.setItem('selectedRowData', JSON.stringify(selectedRowData));
  };

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('rowData') || '[]');
    setRowData(playerData);
    const selectedPlayerData = JSON.parse(
      localStorage.getItem('selectedRowData') || '[]'
    );
    setSelectedRowData(selectedPlayerData);
    const count = playerData.filter((player: any) => player.isSelected).length;
    setCountSelected(count);
    if (count === 0) {
      readCSVData().then((data) => {
        readCSVImageData().then((imageData) => {
          const playerData = data.map((row: any, index: number) => {
            const playerImage = imageData.find(
              (img) => img.Name === row['player']
            );
            return {
              key: index,
              name: row['player'],
              imageSrc: playerImage ? playerImage.image_path : '',
              isSelected: false,
              isCaptain: false,
              isViceCaptain: false,
              toCompare: false,
              values: (() => {
                try {
                  const fixedJSONString = row['values'].replace(/'/g, '"');
                  return JSON.parse(fixedJSONString);
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                  return {};
                }
              })(),
              ai_alerts: (() => {
                try {
                  const fixedJSONString = row['ai_alert'].replace(/'/g, '"');
                  return JSON.parse(fixedJSONString);
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                  return {};
                }
              })(),
            };
          });
          setRowData(playerData);
        });
      });
      setCountSelected(0);
    }
  }, []);
  console.log(rowData);
  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen">
      <Header initial1={initial1} initial2={initial2} />
      {/* team selection divs */}
      <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count={countSelected} />
      </div>
      <div className="flex flex-row gap-4 m-10 w-[95%] grow">
        <PlayerTable
          rowData={rowData}
          setSelectedRowData={setSelectedRowData}
          setCountSelected={setCountSelected}
          setRowData={setRowData}
          setToComparePlayer={setToComparePlayer}
        />
        <Field
          players={selectedRowData}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="bg-[#525E74]"
          onClick={() => (window.location.href = '/AnalysisPage')}
        >
          Analyse My Pick
        </Button>
        <BattingFirstModal
          rowData={rowData}
          setRowData={setRowData}
          setSelectedRowData={setSelectedRowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <Button
          type="button"
          variant="contained"
          color="secondary"
          className="bg-[#525E74]"
          onClick={() => {
            handleAIComparisonClick();
            window.location.href = `/CaptainSelection/?match=${initial1} vs ${initial2}`;
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

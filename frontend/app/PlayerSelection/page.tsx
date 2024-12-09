'use client';
import { Button } from '@mui/material';
import LoadingBar from '@/components/LoadingBar';
import Field from '@/components/field';
import PlayerTable from '@/components/playerTable';
import 'ag-grid-enterprise';
import Header from '@/components/header';
import Papa, { ParseResult } from 'papaparse';
import { useEffect, useState } from 'react';
import BattingFirstModal from '@/components/battingFirstModal';
import ChatbotWrapper from '@/components/chatbot/ChatBotWrapper';
import { rowData } from '@/types';
import { readCSVData } from '@/utils/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const readCSVImageData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch('/names.csv')
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results: ParseResult<{ [key: string]: string }>) => {
            resolve(results.data);
          },
          error: (error: Error) => {
            reject(error);
          },
        });
      })
      .catch((error) => reject(error));
  });
};

export default function Page() {
  const [rowData, setRowData] = useState<rowData[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<rowData[]>([]);
  const [countSelected, setCountSelected] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [toComparePlayer, setToComparePlayer] = useState<string>('');
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
      console.log('Match:', team1, team2);
    }
  }, []);

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
    const count = playerData.filter(
      (player: rowData) => player.isSelected
    ).length;
    setCountSelected(count);
    if (count === 0) {
      readCSVData().then((data) => {
        readCSVImageData().then((imageData) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const playerData = data.map((row: any, index: number) => {
            const playerImage = imageData.find(
              (img) => img.Name === row['player']
            );
            return {
              key: index,
              id: row['player_id'],
              name: row['player'],
              imageSrc: playerImage ? playerImage.image_path : '',
              isSelected: false,
              isCaptain: false,
              isViceCaptain: false,
              toCompare: false,
              team: index === 0 ? 0 : row['team'] === data[0]['team'] ? 0 : 1,
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
                  const fixedJSONString = row['ai_alerts'];
                  return JSON.parse(fixedJSONString);
                } catch (e) {
                  console.error('Error parsing JSON:', e);
                  return {};
                }
              })(),
            };
          });
          playerData.sort((a, b) => {
            const aYpred = a.values.y_pred || [];
            const bYpred = b.values.y_pred || [];
            if (bYpred[5] === aYpred[5]) {
              return a.name.localeCompare(b.name);
            }
            return bYpred[5] - aYpred[5];
          });
          playerData.forEach((player, index) => {
            player.key = index;
          });
          setRowData(playerData);
          console.log('Player data:', playerData);
        });
      });
      setCountSelected(0);
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen">
      <Header
        initial1={initial1}
        initial2={initial2}
        team1players={
          selectedRowData.filter((player) => player.team === 0).length
        }
        team2players={
          selectedRowData.filter((player) => player.team === 1).length
        }
      />
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
          initial1={initial1}
          initial2={initial2}
        />
      </div>
      <div className="flex flex-row gap-4">
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="bg-[#525E74]"
          onClick={() =>
            (window.location.href = `/AnalysisPage?match=${initial1} vs ${initial2}`)
          }
        >
          Analyse My Pick
        </Button>
        {countSelected !== 11 && (
          <BattingFirstModal
            rowData={rowData}
            setRowData={setRowData}
            setSelectedRowData={setSelectedRowData}
            setCountSelected={setCountSelected}
            initial1={initial1}
            initial2={initial2}
          />
        )}
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
        <ChatbotWrapper />
      </div>
    </div>
  );
}

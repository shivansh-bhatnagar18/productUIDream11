'use client';

import { Button } from '@mui/material';
import 'ag-grid-enterprise';
import PlayerCard from '@/components/playerCard';
import PlayerStats from '@/components/playerStats';
import Header from '@/components/header';
import CaptainTable from '@/components/captainTable';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CaptainSelectionHeader from '@/components/CaptainSelectionHeader';
import ChatbotWrapper from '@/components/chatbot/ChatBotWrapper';
import { rowData } from '@/types';

function PageComponents() {
  const searchParams = useSearchParams();
  const name = searchParams.get('playerName');
  const [rowData, setRowData] = useState<rowData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCaptain, setSelectedCaptain] = useState<string>('Captain');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedViceCaptain, setSelectedViceCaptain] =
    useState<string>('Vice Captain');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [countSelected, setCountSelected] = useState<number>(0);
  const [toComparePlayer, setToComparePlayer] =
    useState<string>('Compare Player');
  const [initial1, setInitial1] = useState<string>('');
  const [initial2, setInitial2] = useState<string>('');
  const [match, setMatch] = useState<string>('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = new URLSearchParams(window.location.search).get(
        'match'
      ) as string;
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
        console.log('Invalid match');
        window.location.href = '/'; // navigate to error page!
        // add error popup here
      }
      setMatch(getMatch() as string);
      const [team1, team2] = match.split(' vs ');
      setInitial1(team1);
      setInitial2(team2);
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('rowData') || '[]');
    const count = data.filter((player: rowData) => player.isSelected).length;
    setCountSelected(count);
    setRowData(data);
  }, []);

  const getPlayerId = (playerName: string) => {
    const data = JSON.parse(localStorage.getItem('rowData') || '[]');
    const player = data.find((player: rowData) => player.name === playerName);
    console.log(player);
    return player ? player.id : '';
  };

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen overflow-x-hidden">
      <Header
        initial1={initial1}
        initial2={initial2}
        team1players={rowData.filter((player) => player.team === 0).length}
        team2players={rowData.filter((player) => player.team === 1).length}
      />
      {/* team selection divs */}
      <div className="max-w-[60%] min-w-[60%] mx-auto mt-6">
        <CaptainSelectionHeader />
      </div>
      <div className="flex w-[95%] mt-10 gap-5">
        <PlayerCard playerName={Array.isArray(name) ? name[0] : name || ''} />
        <CaptainTable
          rowData={rowData}
          setCaptainData={setSelectedCaptain}
          setViceCaptainData={setSelectedViceCaptain}
          setRowData={setRowData}
          setToComparePlayer={setToComparePlayer}
        />
        {/* <PlayerTable /> */}
        <PlayerCard playerName={toComparePlayer} />
      </div>
      <div className="flex w-[95%] mt-10 border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white rounded-2xl ">
        <PlayerStats
          rowData={rowData}
          playerName={Array.isArray(name) ? name[0] : name || ''}
          match={match}
          classname="rounded-l-2xl border-x-2"
        />
        <PlayerStats
          classname="rounded-r-2xl border-r-2"
          rowData={rowData}
          playerName={toComparePlayer}
          match={match}
        />
      </div>
      <Button
        type="button"
        variant="contained"
        color="primary"
        className="mt-10 bg-[#2CA74B]"
        onClick={() => {
          window.location.href = `/CaptainSelection?match=${initial1} vs ${initial2}`;
        }}
      >
        Preview
      </Button>
      <ChatbotWrapper
        player1_id={getPlayerId(Array.isArray(name) ? name[0] : name || '')}
        player2_id={getPlayerId(toComparePlayer)}
        match_no={match}
        compare={true}
      />
    </div>
  );
}
export default function Page() {
  return (
    <Suspense fallback={<div className='h-screen w-screen bg-black'>Loading...</div>}>
      <PageComponents />
    </Suspense>
  );
}
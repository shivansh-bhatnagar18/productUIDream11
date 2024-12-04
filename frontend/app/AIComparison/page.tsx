'use client';
import { Button } from '@mui/material';
import LoadingBar from '@/components/LoadingBar';
import PlayerTable from '@/components/playerTable';
import 'ag-grid-enterprise';
import PlayerCard from '@/components/playerCard';
import PlayerStats from '@/components/playerStats';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatbotWrapper from '@/components/chatbot/ChatBotWrapper';

function Page() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [rowData, setRowData] = useState<any[]>([]);
  const [countSelected, setCountSelected] = useState<number>(0);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [toComparePlayer, setToComparePlayer] = useState<string>(name || '');
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
      if (match) {
        const [team1, team2] = match.split(' vs ');
        setInitial1(team1);
        setInitial2(team2);
      }
    }
  }, []);

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('rowData') || '[]');
    setRowData(playerData);
    const selectedPlayers = playerData.filter(
      (player: any) => player.isSelected
    );
    setSelectedPlayers(selectedPlayers);
    const count = playerData.filter((player: any) => player.isSelected).length;
    setCountSelected(count);
  }, []);

  const getPlayerId = (playerName: string) => {
    const data = JSON.parse(localStorage.getItem('rowData') || '[]');
    const player = data.find((player: any) => player.name === playerName);
    console.log(player);
    return player ? player.id : '';
  };

  return (
    <div className="flex flex-col items-center bg-[#0D0402]  min-h-screen max-w-screen min-w-screen overflow-x-hidden">
      <Header
        initial1={initial1}
        initial2={initial2}
        team1players={
          selectedPlayers.filter((player) => player.team === 0).length
        }
        team2players={
          selectedPlayers.filter((player) => player.team === 1).length
        }
      />
      {/* team selection divs */}
      <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count={countSelected} />
      </div>
      <div className="flex w-[95%] mt-10 gap-5">
        <PlayerCard playerName={Array.isArray(name) ? name[0] : name || ''} />
        <PlayerTable
          rowData={rowData}
          setSelectedRowData={setSelectedPlayers}
          setCountSelected={setCountSelected}
          setRowData={setRowData}
          setToComparePlayer={setToComparePlayer}
          reverse={true}
        />
        <PlayerCard playerName={toComparePlayer} />
      </div>
      <div className="flex w-[95%] mt-10">
        <PlayerStats
          classname="rounded-l-2xl border-x-2"
          rowData={rowData}
          playerName={Array.isArray(name) ? name[0] : name || ''}
        />
        <PlayerStats
          classname="rounded-r-2xl border-r-2"
          rowData={rowData}
          playerName={toComparePlayer}
        />
      </div>
      <Button
        type="button"
        variant="contained"
        className="m-10 bg-[#2CA74B]"
        onClick={() => {
          window.location.href = `/PlayerSelection?match=${initial1} vs ${initial2}`;
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

export default Page;

'use client';

import { Button } from '@mui/material';
import LoadingBar from '@/components/LoadingBar';
import 'ag-grid-enterprise';
import PlayerCard from '@/components/playerCard';
import PlayerStats from '@/components/playerStats';
import Header from '@/components/header';
import CaptainTable from '@/components/captainTable';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function page() {
  const searchParams = useSearchParams();
  const name = searchParams.get('playerName');
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedCaptain, setSelectedCaptain] = useState<any | null>(null);
  const [selectedViceCaptain, setSelectedViceCaptain] = useState<any | null>(
    null
  );
  const [countSelected, setCountSelected] = useState<number>(0);
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
      const [team1, team2] = match.split(' vs ');
      setInitial1(team1);
      setInitial2(team2);
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('rowData') || '[]');
    const count = data.filter((player: any) => player.isSelected).length;
    setCountSelected(count);
    setRowData(data);
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen overflow-x-hidden">
      <Header initial1={initial1} initial2={initial2} />
      {/* team selection divs */}
      <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count={countSelected} />
      </div>
      <div className="flex w-[95%] mt-10 gap-5">
        <PlayerCard
          playerName={Array.isArray(name) ? name[0] : name || ''}
          rank={1}
        />
        <CaptainTable
          rowData={rowData}
          setCaptainData={setSelectedCaptain}
          setViceCaptainData={setSelectedViceCaptain}
          setRowData={setRowData}
          setToComparePlayer={setToComparePlayer}
        />
        {/* <PlayerTable /> */}
        <PlayerCard playerName={toComparePlayer} rank={2} />
      </div>
      <div className="flex w-[95%] mt-10 border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white rounded-2xl ">
        <PlayerStats
          rowData={rowData}
          playerName={selectedCaptain}
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
    </div>
  );
}

export default page;

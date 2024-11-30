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
import Header from '@/components/header';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const [rowData, setRowData] = useState<any[]>([]);
  const [countSelected, setCountSelected] = useState<number>(0);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [toComparePlayer, setToComparePlayer] = useState<string>(name || '');

  useEffect(() => {
    const playerData = JSON.parse(localStorage.getItem('rowData') || '[]');
    setRowData(playerData);
    const count = playerData.filter((player: any) => player.isSelected).length;
    setCountSelected(count);
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402]  min-h-screen max-w-screen min-w-screen overflow-x-hidden">
      <Header />
      {/* team selection divs */}
      <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count={countSelected} />
      </div>
      <div className="flex w-[95%] mt-10 gap-5">
        <PlayerCard
          playerName={Array.isArray(name) ? name[0] : name || ''}
          rank={1}
        />
        <PlayerTable
          rowData={rowData}
          setSelectedRowData={setSelectedPlayers}
          setCountSelected={setCountSelected}
          setRowData={setRowData}
          setToComparePlayer={setToComparePlayer}
        />
        <PlayerCard playerName={toComparePlayer} rank={2} />
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
          window.location.href = '/PlayerSelection';
        }}
      >
        Preview
      </Button>
    </div>
  );
}

export default Page;

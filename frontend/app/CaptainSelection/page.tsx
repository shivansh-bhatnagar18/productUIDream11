'use client';
import LoadingBar from '@/components/LoadingBar';
import 'ag-grid-enterprise';
import PlayerCard from '@/components/playerCard';
import CaptainTable from '@/components/captainTable';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import TypeOfPlayerModal from '@/components/typeOfPlayerModal';

function page() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedCaptain, setSelectedCaptain] = useState<any | null>(null);
  const [selectedViceCaptain, setSelectedViceCaptain] = useState<any | null>(
    null
  );
  const [countSelected, setCountSelected] = useState<number>(0);
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

  useEffect(() => {
    const teamData = JSON.parse(
      localStorage.getItem('selectedRowData') || '[]'
    );
    const data = JSON.parse(localStorage.getItem('rowData') || '[]');
    const count = data.filter((player: any) => player.isSelected).length;
    setCountSelected(count);
    setRowData(teamData);
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen overflow-x-hidden">
      <Header initial1={initial1} initial2={initial2} />
      {/* team selection divs */}
      <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
        <LoadingBar count={countSelected} />
      </div>
      <div className="flex w-[95%] mt-10 gap-5">
        <PlayerCard playerName={selectedCaptain || 'Captain Default'} />
        <CaptainTable
          rowData={rowData}
          setCaptainData={setSelectedCaptain}
          setViceCaptainData={setSelectedViceCaptain}
          setRowData={setRowData}
        />
        <PlayerCard playerName={selectedViceCaptain || 'Vice Captain'} />
      </div>

      <TypeOfPlayerModal
        rowData={rowData}
        initial1={initial1}
        initial2={initial2}
      />
    </div>
  );
}

export default page;

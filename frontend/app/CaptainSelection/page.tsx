'use client';
import 'ag-grid-enterprise';
import PlayerCard from '@/components/playerCard';
import CaptainTable from '@/components/captainTable';
import Header from '@/components/header';
import { useEffect, useState } from 'react';
import TypeOfPlayerModal from '@/components/typeOfPlayerModal';
import CaptainSelectionHeader from '@/components/CaptainSelectionHeader';
import ChatbotWrapper from '@/components/chatbot/ChatBotWrapper';

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
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('captain') &&
      localStorage.getItem('viceCaptain')
    ) {
      const captain = localStorage.getItem('captain');
      if (captain?.trim() !== '') {
        setSelectedCaptain(captain?.replace(/"/g, ''));
      }
      const viceCaptain = localStorage.getItem('viceCaptain');
      if (viceCaptain?.trim() !== '') {
        setSelectedViceCaptain(viceCaptain?.replace(/"/g, ''));
      }
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
      <ChatbotWrapper />
    </div>
  );
}

export default page;

'use client';
import NameModal from '@/components/NameModal';
import Navbar from '@/components/navbar';
import { Suspense } from 'react';
import Team from '@/components/Team';
import { FormControl, Select, MenuItem, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

function Mainpage() {

  const [date, setDate] = useState('');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen">
      <Navbar />
      <div className="w-[80%] flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-normal leading-[141.667%] tracking-[-1.2px]">
          Choose Match
        </h1>
        <div className="w-full flex items-center justify-center mt-10">
          <div className="h-[2px] bg-white w-full blur-xs"></div>
          <div className="flex items-center z-10">
            <h2 className="text-white text-2xl font-normal leading-[141.667%] tracking-[-1.2px] bg-red-800 px-20 py-2 rounded-xl">
              LIVE
            </h2>
          </div>
          <div className="h-[2px] bg-white w-full blur-xs"></div>
        </div>

        <div className="bg-white bg-opacity-10  rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-[80%] py-5 px-10 mt-12 shadow-inner shadow-white">
          <NameModal
            Team1="India"
            Team2="South Africa"
            initial1="IND"
            initial2="SA"
            time="5:00 PM"
          />
          <NameModal
            Team1="India"
            Team2="Sri Lanka"
            initial1="IND"
            initial2="SL"
            time="2:30 PM"
          />
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <div className="h-[2px] bg-white w-full blur-xs"></div>
            <div className="flex items-center z-10">
              <h2 className="text-white text-2xl font-normal leading-[141.667%] tracking-[-1.2px] py-2 w-max px-4">
                UPCOMING MATCHES
              </h2>
            </div>
          <div className="h-[2px] bg-white w-full blur-xs"></div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-[80%] py-5 px-10 my-12 shadow-inner shadow-white">
          <NameModal
            Team1="Delhi Capitals"
            Team2="Royal Challengers"
            initial1="DC"
            initial2="RCB"
            time="7:30 PM"
          />
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <div className="h-[2px] bg-white w-full blur-xs"></div>
            <div className="flex items-center z-10">
              <h2 className="text-white text-2xl font-normal leading-[141.667%] tracking-[-1.2px] py-2 w-max px-4">
                CSV GENERATOR
              </h2>
            </div>
          <div className="h-[2px] bg-white w-full blur-xs"></div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-full py-5 px-10 my-12 shadow-inner shadow-white">
        <div className='flex items-center justify-center'>
        <div className="bg-white bg-opacity-10 justify-between items-center rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-[80%] py-5 px-10 my-12 shadow-inner shadow-white">
          <div className="flex justify-around w-full h-full">
            <Team Team={team1} initial="T1" />
            <div className="flex flex-col items-center my-16 ">
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <TextField
                  label="Enter Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                  }}
                />
              </FormControl>

              <p className="text-3xl mt-5">Match Format:</p>
              <p className="text-4xl font-bold mb-5">ODI</p>

              {date !== '' ? (
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <TextField
                  label="Team 1"
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    marginBottom: '10px',
                  }}
                  />
                  <TextField
                  label="Team 2"
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    marginBottom: '10px',
                  }}
                  />
                </FormControl>
              ) : (
                <FormControl sx={{ m: 1, minWidth: 300 }} disabled>
                  <TextField
                  label="Team 1"
                  value={team1}
                  onChange={(e) => setTeam1(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    marginBottom: '10px',
                  }}
                  />
                  <TextField
                  label="Team 2"
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    marginBottom: '10px',
                  }}
                  />
                </FormControl>
              )}
            </div>

            <Team Team={team2} initial="T2" />
          </div>
          {team2 !== '' ? (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="bg-[#2CA74B] font-bold w-32 m-6 rounded-xl py-2 px-4"
              onClick={() =>
                (window.location.href = '/PlayerSelection/?match=T1 vs T2')
              }
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="bg-[#637d6a] font-bold w-32 m-6 rounded-xl py-2 px-8"
              onClick={() =>
                (window.location.href = '/PlayerSelection/?match=T1 vs T2')
              }
              disabled
              sx={{
                '&:disabled': {
                  backgroundColor: '#637d6a',
                  color: 'white',
                },
              }}
            >
              Next
            </Button>
          )}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={<div className="h-screen w-screen bg-black">Loading...</div>}
    >
      <Mainpage />
    </Suspense>
  );
}

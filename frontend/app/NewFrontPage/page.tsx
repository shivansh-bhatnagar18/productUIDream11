'use client';
import Navbar from '@/components/navbar';
import { Suspense, useState } from 'react';
import { Button, Select, MenuItem, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Team from '@/components/Team';

 function Mainpage() {
  const [date, setDate] = useState('');
  const [match, setMatch] = useState('');
  const handleChangeDate = (e: SelectChangeEvent) => {
    setDate(e.target.value as string);
    if (date !== '') {
      setMatch('');
    }
  };
  const handleChange = (e: SelectChangeEvent) => {
    setMatch(e.target.value as string);
  };

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen pb-32">
      <Navbar />
      <div className="w-[80%] flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-center mt-10">
          <div className="h-[2px] bg-white w-full blur-xs"></div>
          <h1 className="text-white w-full text-center text-4xl font-normal">
            Choose Match
          </h1>
          <div className="h-[2px] bg-white w-full blur-xs"></div>
        </div>

        <div className="bg-white bg-opacity-10 justify-between items-center rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-[80%] py-5 px-10 my-12 shadow-inner shadow-white">
          <div className="flex justify-around w-full h-full">
            <Team Team="Australia" initial="AUS" />
            <div className="flex flex-col items-center my-16 ">
              <FormControl sx={{ m: 1, minWidth: 300 }}>
                <Select
                  value={date}
                  onChange={handleChangeDate}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    '& .MuiSelect-icon': {
                      color: 'black',
                    },
                    borderRadius: '15px',
                  }}
                >
                  <MenuItem value="">
                    <em>Date</em>
                  </MenuItem>
                  <MenuItem value="1">Week 1</MenuItem>
                  <MenuItem value="2">Week 2</MenuItem>
                  <MenuItem value="3">Week 3</MenuItem>
                </Select>
              </FormControl>

              <p className="text-3xl mt-5">Match Format:</p>
              <p className="text-4xl font-bold mb-5">ODI</p>

              {date !== '' ? (
                <FormControl sx={{ m: 1, minWidth: 300 }}>
                  <Select
                    value={match}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      backgroundColor: 'white',
                      color: 'black',
                      '& .MuiSelect-icon': {
                        color: 'black',
                      },
                      borderRadius: '15px',
                    }}
                  >
                    <MenuItem value="">
                      <em>Match</em>
                    </MenuItem>
                    <MenuItem value="match1">Match 1</MenuItem>
                    <MenuItem value="match2">Match 2</MenuItem>
                    <MenuItem value="match3">Match 3</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl sx={{ m: 1, minWidth: 300 }} disabled>
                  <Select
                    value={match}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      backgroundColor: 'white',
                      color: 'black',
                      '& .MuiSelect-icon': {
                        color: 'black',
                      },
                      borderRadius: '15px',
                    }}
                  >
                    <MenuItem value="">
                      <em>Match</em>
                    </MenuItem>
                    <MenuItem value="match1">Match 1</MenuItem>
                    <MenuItem value="match2">Match 2</MenuItem>
                    <MenuItem value="match3">Match 3</MenuItem>
                  </Select>
                </FormControl>
              )}
            </div>

            <Team Team="Pakistan" initial="PAK" />
          </div>
          {match !== '' ? (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className="bg-[#2CA74B] font-bold w-32 m-6 rounded-xl py-2 px-4"
              onClick={() =>
                (window.location.href = '/PlayerSelection/?match=AUS vs PAK')
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
                (window.location.href = '/PlayerSelection/?match=AUS vs PAK')
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

        <div className="h-[2px] bg-white w-full blur-xs"></div>
      </div>
    </div>
  );
}


export default function Page() {
  return (
    <Suspense fallback={<div className='h-screen w-screen bg-black'>Loading...</div>}>
      <Mainpage />
    </Suspense>
  );
}
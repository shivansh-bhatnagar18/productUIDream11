'use client';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { Button, Select, MenuItem, FormControl } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Team from '@/components/Team';

export default function Mainpage() {
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
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen pb-16 lg:pb-32">
      <Navbar />
      <div className="w-[90%] md:w-[80%] flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-center mt-6 md:mt-10">
          <div className="h-[1px] bg-white w-full"></div>
          <h1 className="text-white w-full text-center text-2xl md:text-4xl font-normal px-4">
            Choose Match
          </h1>
          <div className="h-[1px] bg-white w-full"></div>
        </div>

        <div className="bg-white bg-opacity-10 justify-between items-center rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-full lg:w-[80%] py-5 px-6 md:px-10 my-12 shadow-inner shadow-white">
          <div className="flex flex-col sm:flex-row justify-around items-center w-full">
            <Team Team="Australia" initial="AUS" />
            <div className="flex flex-col items-center my-6 md:my-16 space-y-4">
              <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 300 }}>
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
                    borderRadius: '10px',
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

              <p className="text-2xl md:text-3xl mt-4">Match Format:</p>
              <p className="text-3xl md:text-4xl font-bold">ODI</p>

              <FormControl
                sx={{ m: 1, minWidth: 200, maxWidth: 300 }}
                disabled={!date}
              >
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
                    borderRadius: '10px',
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
            </div>

            <Team Team="Pakistan" initial="PAK" />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={`font-bold w-28 md:w-32 m-6 rounded-xl py-2 px-4 ${match
              ? 'bg-[#2CA74B] hover:bg-[#249d43]'
              : 'bg-[#637d6a] cursor-not-allowed'
              }`}
            onClick={() =>
              match &&
              (window.location.href = `/PlayerSelection/?match=AUS vs PAK`)
            }
            disabled={!match}
            sx={{
              '&:disabled': {
                backgroundColor: '#637d6a',
                color: 'white',
              },
            }}
          >
            Next
          </Button>
        </div>

        <div className="h-[1px] bg-white w-full"></div>
      </div>
    </div>
  );
}

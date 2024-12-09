'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '10px',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
};

interface MatchProps {
  Team1: string;
  Team2: string;
  initial1: string;
  time: string;
  initial2: string;
}

const Match: React.FC<MatchProps> = ({
  Team1,
  Team2,
  initial1,
  initial2,
  time,
}) => {
  const names = [
    'Jeebie Warriors',
    'Kalings XI',
    'The Invincibles',
    'The Titans',
    'The Super Kings',
    'The Super Strikers',
    'The Super Giants',
    'The Super Warriors',
  ];
  const [teamName, setTeamName] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
    setTeamName('');
  };

  const handleClick = () => {
    handleClose();
  };

  return (
    <div>
      <div
        className="bg-white bg-opacity-20 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white  border-r-white flex w-full py-5 px-10 justify-center mt-2 overflow-x-auto shadow-inner shadow-white hover:cursor-pointer"
        onClick={() => {
          localStorage.clear();
          handleOpen();
        }}
      >
        <div className="flex items-center gap-10 w-[40%]">
          <Image
            src={`/teamlogos/${initial1}.svg`}
            width={'72'}
            height={'72'}
            alt="/"
            className="rounded-full h-20 w-20 object-contain"
          />
          <div className="flex flex-col">
            <h3 className="text-white text-3xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
              {initial1}
            </h3>
            <p className="text-white text-md leading-[ 283.333%] tracking-[-0.6px]">
              {Team1}
            </p>
          </div>
        </div>
        <p className="text-[#787878] text-xl leading-[ 283.333%] tracking-[-0.6px]">
          {time}
        </p>
        <div className="flex items-center gap-10 w-[40%] flex-row-reverse">
          <Image
            src={`/teamlogos/${initial2}.svg`}
            width={'72'}
            height={'72'}
            alt="/"
            className="rounded-full h-20 w-20 object-contain"
          />
          <div className="flex flex-col items-end">
            <h3 className="text-white text-3xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
              {initial2}
            </h3>
            <p className="text-white text-md leading-[ 283.333%] tracking-[-0.6px]">
              {Team2}
            </p>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              width: 'full',
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              What would you like to name your team?
            </Typography>
            <div className="flex w-full justify-between mt-4">
              <div className="flex flex-col w-full justify-center">
                <div className="w-full flex flex-col gap-10 items-center">
                  <input
                    type="text"
                    className=" min-h-[40%] w-[70%] rounded-xl bg-[#464646] px-3 outline-none"
                    placeholder={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
                    }}
                  />
                  <div className="flex w-full justify-center gap-5">
                    <Button
                      type="button"
                      variant="contained"
                      color={'warning'}
                      className="my-10 mx-5 bg-[#525E74]"
                      onClick={() => {
                        setTeamName(
                          names[Math.floor(Math.random() * names.length)]
                        );
                      }}
                    >
                      Recommend
                    </Button>
                    {teamName !== '' ? (
                      <Button
                        type="button"
                        variant="contained"
                        color={'success'}
                        className="my-10 mx-5 bg-[#2CA74B]"
                        onClick={() => {
                          window.location.href = `/PlayerSelection/?match=${initial1} vs ${initial2}`;
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="contained"
                        color={'success'}
                        className="my-10 mx-5 bg-[#2CA74B]"
                        disabled
                        onClick={() => {
                          window.location.href = `/PlayerSelection/?match=${initial1} vs ${initial2}`;
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Match;

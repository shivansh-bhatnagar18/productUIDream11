import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PlayerCard from './playerCard';
import { useState } from 'react';
import { useEffect } from 'react';
// import PhaseModal from './phaseModal';

interface PhaseModalProps {
  player: string;
  matter: string;
}

const style = {
  position: 'absolute',
  bottom: '0%',
  width: '99%',
  margin: '10px',
  bgcolor: 'rgba(255, 255, 255, 0.3)',
  borderRadius: '10px',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function PhaseModal({ matter, player }: PhaseModalProps) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showRecommendations, setShowRecommendations] = React.useState(false);
  const [phase, setPhase] = React.useState('');
  const [rowData, setRowData] = React.useState<any[]>([]);

  useEffect(() => {
    const playerData = localStorage.getItem('rowData');
    if (playerData) {
      setRowData(JSON.parse(playerData));
    }
  }, []);

  const handleClick = (typeOfPlayer: string) => {
    handleClose();
    setPhase(typeOfPlayer);
    console.log(typeOfPlayer);
    setShowRecommendations(true);
  };

  return (
    <div>
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
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Custom Recommendations
            </Typography>
            <div className="h-[35%] rounded-xl flex gap-2 w-[50%] my-2">
              <div className="bg-green-500 bg-opacity-50 grow rounded-xl flex flex-col items-center py-2 ">
                {/* <Image src="/india.svg" width={'72'} height={'72'} alt="/" /> */}
                <p className="text-white text-lg ml-2 mt-2">Player Type</p>
                <p className="text-white text-sm ml-2">{player}</p>
              </div>
              <div className="bg-green-500 bg-opacity-50 w-[35%] rounded-xl flex flex-col items-center py-2">
                {/* <Image src="/teamlogos/SA.svg" width={'72'} height={'72'} alt="/" /> */}
                <p className="text-white text-lg ml-2 mt-2">Performance</p>
                <p className="text-white text-sm ml-2">{matter}</p>
              </div>
              <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2">
                {/* <Image src="/think.png" width={'72'} height={'72'} alt="/" /> */}
                <p className="text-white text-lg ml-2 mt-2">Phase</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
            </div>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              Which match phase performance matters most?
            </Typography>
            <div className="h-[35%] rounded-xl flex gap-2 w-full mt-10">
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2 "
                onClick={() => {
                  handleClick('Power Play');
                  setShowRecommendations(true);
                }}
              >
                <Image src="/power.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Power Play</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2"
                onClick={() => {
                  handleClick('Middle Overs');
                  setShowRecommendations(true);
                }}
              >
                <Image src="/middle.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Middle Overs</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2"
                onClick={() => {
                  handleClick('Death Overs');
                  setShowRecommendations(true);
                }}
              >
                <Image src="/death.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Death Overs</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2"
                onClick={() => {
                  handleClick("Can't Say");
                  setShowRecommendations(true);
                }}
              >
                <Image src="/think.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Can't Say</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      {showRecommendations && (
        <div className="bg-white bg-opacity-10 rounded-xl border-2 border-white p-10 flex flex-col items-center mt-5">
          <p className="text-white text-2xl mb-10">
            Here are our top 3 recommendations
          </p>
          <div className="flex gap-10">
            {rowData.slice(0, 3).map((player, index) => (
              <div key={index} className="flex flex-col relative">
                {index === 0 && (
                  <Image
                    src="/first.png"
                    width={'72'}
                    height={'72'}
                    alt="/"
                    className="absolute -top-5 -left-5 z-100"
                  />
                )}
                {index === 1 && (
                  <Image
                    src="/second.png"
                    width={'72'}
                    height={'72'}
                    alt="/"
                    className="absolute -top-5 -left-5 z-100"
                  />
                )}
                {index === 2 && (
                  <Image
                    src="/third.png"
                    width={'72'}
                    height={'72'}
                    alt="/"
                    className="absolute -top-5 -left-5 z-100"
                  />
                )}
                <PlayerCard key={index} playerName={player.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

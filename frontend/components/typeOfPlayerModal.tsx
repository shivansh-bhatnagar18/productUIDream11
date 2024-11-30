import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PlayerCard from './playerCard';
import MatterModal from './matterModal';

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

interface typeOfPlayerModalProps {
  rowData: any[];
}

export default function TypeOfPlayerModal({ rowData }: typeOfPlayerModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showRecommendations, setShowRecommendations] = React.useState(true);
  const [showNext, setShowNext] = React.useState(false);
  const [typeOfPlayer, setTypeOfPlayer] = React.useState('');

  const handleClick = (typeOfPlayer: string) => {
    handleClose();
    setTypeOfPlayer(typeOfPlayer);
    console.log(typeOfPlayer);
    setShowNext(true);
  };

  return (
    <div>
      <div className="flex flex-row justify-center mt-10 gap-10">
        <Button
          type="button"
          variant="contained"
          color="primary"
          className="my-10 mx-5 bg-[#525E74]"
          onClick={() => {
            localStorage.setItem('rowData', JSON.stringify(rowData));
            console.log('rowData', rowData);
          }}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          className="my-10 mx-5 bg-[#F69C2C]"
          onClick={() => {
            handleOpen();
            setShowRecommendations(false);
          }}
        >
          custom
        </Button>
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
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Custom Recommendations
            </Typography>
            <div className="h-[35%] rounded-xl flex gap-2 w-[50%] my-2">
              <div className="bg-white bg-opacity-20 grow rounded-xl flex flex-col items-center py-2 ">
                {/* <Image src="/india.svg" width={'72'} height={'72'} alt="/" /> */}
                <p className="text-white text-lg ml-2 mt-2">Player Type</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2">
                {/* <Image src="/teamlogos/SA.svg" width={'72'} height={'72'} alt="/" /> */}
                <p className="text-white text-lg ml-2 mt-2">Performance</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2">
                {/* <Image src="/think.png" width={'72'} height={'72'} alt="/" /> */}
                <p className="text-white text-lg ml-2 mt-2">Phase</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
            </div>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              What type of player do you prefer for captain?
            </Typography>
            <div className="h-[35%] rounded-xl flex gap-2 w-full mt-10">
              <div
                className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col items-center py-2 "
                onClick={() => {
                  handleClick('Batsman');
                }}
              >
                <Image src="/Batsman.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Batsman</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col items-center py-2"
                onClick={() => {
                  handleClick('Bowler');
                }}
              >
                <Image src="/bowler.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Bowler</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col items-center py-2"
                onClick={() => {
                  handleClick('All Rounder');
                }}
              >
                <Image
                  src="/allrounder.png"
                  width={'72'}
                  height={'72'}
                  alt="/"
                />
                <p className="text-white text-lg ml-2 mt-2">All Rounder</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[25%] rounded-xl flex flex-col items-center py-2"
                onClick={() => {
                  handleClick("Can't Say");
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
        <div className="bg-white bg-opacity-10 rounded-xl border-2 border-white p-10 flex flex-col items-center mt-24">
          <p className="text-white text-2xl mb-10">
            Here are our top 3 recommendations
          </p>
          <div className="flex gap-10">
            {rowData.slice(0, 3).map((player, index) => (
              <div
                onClick={() => {
                  window.location.href =
                    '/CaptainComparison?playerName=' + player.name;
                }}
              >
                <PlayerCard
                  key={index}
                  playerName={player.name}
                  rank={index + 1}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {showNext && <MatterModal player={typeOfPlayer} />}
    </div>
  );
}

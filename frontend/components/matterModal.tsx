import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PlayerCard from './playerCard';
import PhaseModal from './phaseModal';

interface MatterModalProps {
  player: string;
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

export default function MatterModal({ player }: MatterModalProps) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showNext, setShowNext] = React.useState(false);
  const [matter, setMatter] = React.useState('');

  const handleClick = (typeOfPlayer: string) => {
    handleClose();
    setMatter(typeOfPlayer);
    console.log(typeOfPlayer);
    setShowNext(true);
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
            timeout: 10,
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
              What matters most to you?
            </Typography>
            <div className="h-[35%] rounded-xl flex gap-2 w-full mt-10">
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2 "
                onClick={() => {
                  handleClick('Form');
                }}
              >
                <Image src="/form.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Form</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2"
                onClick={() => {
                  handleClick('Venue');
                }}
              >
                <Image src="/venue.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Venue</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2"
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
      {showNext && <PhaseModal matter={matter} player={player} />}
    </div>
  );
}

// GraphModal.tsx
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'rgba(255, 255, 255, 0.3)',
  // borderRadius: '10px',
  // border: '0px solid #fff',
  // boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
};

interface Props {
  Component: React.FC;
  Heading: string;
}

export default function WhyModal({
  Component,
  Heading
}: Props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = (name: string) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={() => handleOpen(Heading)}>
        <Component />
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {Heading}
            </Typography>
            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-center m-5">
                  <Image src='/stats.jpg' alt="Image" width={800} height={800} />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

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
  // border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
};

interface Props {
  Component: React.FC;
  description: string;
  data: any;
  Heading: string;
  image?: string;
}

export default function GraphModal({
  Component,
  Heading,
  data,
  description,
  image,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [finaldata, setFinalData] = React.useState(data);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = (name: string) => {
    setOpen(true);
    const newdata = [
      { name: 'Match 1', uv: data[0] },
      { name: 'Match 2', uv: data[1] },
      { name: 'Match 3', uv: data[2] },
      { name: 'Match 4', uv: data[3] },
    ];
    setFinalData(newdata);

    onOpenSpeak(name);
  };

  const handleClose = () => {
    setOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const onOpenSpeak = (file: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    audioRef.current = new Audio(`/${file}.mp3`);

    audioRef.current.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
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
              <div className="flex flex-col justify-center">
                <div className="w-[350px]">{description}</div>
                {image ? (
                  <Image src={image} alt="Image" width={400} height={400} />
                ) : (
                  data && (
                    <div className="h-[200px] rounded-xl flex gap-2 w-[350px] -ml-5">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          width={500}
                          height={300}
                          data={finaldata}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" stroke="white" />
                          <YAxis stroke="white" />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="pv"
                            stroke="#D83D3D"
                            activeDot={{ r: 8 }}
                          />
                          <Line type="monotone" dataKey="uv" stroke="#D83D3D" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )
                )}
              </div>
              <img
                src="/videos/mascot.gif"
                alt="Mascot GIF"
                style={{
                  // maxWidth: '40%',
                  // position: 'fixed',
                  marginLeft: '-40%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

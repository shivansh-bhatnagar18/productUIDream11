// import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const style = {
  position: 'absolute',
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
  flexDirection: 'column',
  alignItems: 'center',
};

interface Props {
  Component: React.FC;
  data: any;
  Heading: string;
}

export default function GraphModal({ Component, Heading, data }: Props) {
  const [open, setOpen] = React.useState(false);
  const [finaldata, setFinalData] = React.useState(data);
  const handleOpen = () => {
    const newdata = [
      { name: 'Match 1', uv: data[0] },
      { name: 'Match 2', uv: data[1] },
      { name: 'Match 3', uv: data[2] },
      { name: 'Match 4', uv: data[3] },
    ];
    setFinalData(newdata);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //   const handleClick = () => {
  //     const lockedPlayers = rowData.filter((player) => player.isLocked);
  //     const remainingSlots = 11 - lockedPlayers.length;
  //     rowData
  //       .filter((player) => !player.isLocked && !player.isExclude)
  //       .slice(0, remainingSlots)
  //       .forEach((player) => (player.isSelected = true));
  //     const updatedRowData = [...rowData];
  //     setRowData(updatedRowData);
  //     setSelectedRowData(updatedRowData.filter((player) => player.isSelected));
  //     localStorage.setItem('rowData', JSON.stringify(updatedRowData));
  //     localStorage.setItem(
  //       'selectedRowData',
  //       JSON.stringify(updatedRowData.filter((player) => player.isSelected))
  //     );
  //     setCountSelected(11);
  //     handleClose();
  //   };

  return (
    <div>
      <div onClick={handleOpen}>
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
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {Heading}
            </Typography>
            <div className="h-[200px] rounded-xl flex gap-2 w-[500px] -ml-5">
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
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="name" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

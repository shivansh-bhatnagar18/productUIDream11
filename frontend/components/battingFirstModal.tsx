import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
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
  rowData: any[];
  setRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setCountSelected: React.Dispatch<React.SetStateAction<number>>;
}

export default function BattingFirstModal({
  rowData,
  setRowData,
  setCountSelected,
  setSelectedRowData,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    const updatedRowData = rowData.map((player, index) => ({
      ...player,
      isSelected: index < 11 ? true : false,
    }));
    setRowData(updatedRowData);
    setSelectedRowData(updatedRowData.filter((player) => player.isSelected));
    localStorage.setItem('rowData', JSON.stringify(updatedRowData));
    localStorage.setItem(
      'selectedRowData',
      JSON.stringify(updatedRowData.filter((player) => player.isSelected))
    );
    setCountSelected(11);
    handleClose();
  };

  return (
    <div>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className="bg-[#F64848]"
      >
        AI Expert Team
      </Button>
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
              Which team do you think will be batting first?
            </Typography>
            <div className="h-[35%] rounded-xl flex gap-2 w-full mt-10">
              <div
                className="bg-white bg-opacity-20 grow rounded-xl flex flex-col items-center py-2"
                onClick={handleClick}
              >
                <Image src="/india.svg" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">IND</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2"
                onClick={handleClick}
              >
                <Image src="/SA.svg" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">SA</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
              <div
                className="bg-white bg-opacity-20 w-[35%] rounded-xl flex flex-col items-center py-2"
                onClick={handleClick}
              >
                <Image src="/think.png" width={'72'} height={'72'} alt="/" />
                <p className="text-white text-lg ml-2 mt-2">Can't Say</p>
                {/* <p className="text-white text-5xl font-bold ml-2">30</p> */}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

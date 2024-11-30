'use client';
import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import PlayerComponent from './playerAvatar';
import PlayerFormation from './playerFormation';

interface PlayerProps {
  imageSrc: string;
  points: number;
  name: string;
  key: number;
  isSelected: boolean;
}

interface FieldProps {
  players: PlayerProps[];
  rowData: any[];
  initial1: string;
  initial2: string;
  setCountSelected?: React.Dispatch<React.SetStateAction<number>>;
}

const Field: React.FC<FieldProps> = ({
  players,
  rowData,
  setCountSelected,
  initial1,
  initial2,
}) => {
  return (
    <Card
      className="bg-green-200 p-4 rounded-lg shadow-lg w-[50%]"
      style={{
        backgroundImage: 'url(/ground.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        className="text-center text-xs text-black font-sans"
        style={{
          marginTop: '-12px',
          fontSize: '1rem',
        }}
      >
        Venue:{' '}
        <span className="text-white font-sans">SuperSport Park, Centurion</span>
      </Typography>

      <Box className="relative my-4 w-96 h-96 rounded-md flex justify-center items-center bg-cover bg-center">
        <PlayerFormation
          players={players}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </Box>

      <Box className="flex space-x-2 justify-center items-center w-full">
        <Box
          className="flex items-center p-2 rounded-md flex-row"
          justifyContent="space-between"
          style={{
            backgroundColor: 'rgb(88 172 108)',
            padding: '4px',
            width: '25%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="pl-2 grow">
            <Typography
              className="text-xs text-gray-700"
              style={{ fontSize: '0.5rem', marginTop: '4px' }}
            >
              Pitch
            </Typography>
            <Typography
              className="text-black font-semibold"
              style={{ fontSize: '0.5rem' }}
            >
              Balanced
            </Typography>
          </div>
          <img
            src="/bat.svg"
            alt="Bat"
            style={{
              width: '22px',
              height: 'auto',
            }}
          />
        </Box>

        <Box
          className="flex items-center p-2 rounded-md"
          justifyContent="space-between"
          style={{
            backgroundColor: 'rgb(88 172 108)',
            padding: '4.5px',
            width: '25%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="pl-2 grow">
            <Typography
              className="text-xs text-gray-700"
              style={{ fontSize: '0.44rem', marginTop: '4px' }}
            >
              Good for
            </Typography>
            <Typography
              className="text-black font-semibold"
              style={{ fontSize: '0.5rem' }}
            >
              Neutral
            </Typography>
          </div>
          <img
            src="/ball.svg"
            alt="Bat"
            style={{
              width: '22px',
              height: 'auto',
              marginLeft: '6px',
            }}
          />
        </Box>

        <Box
          className="flex items-center p-2 rounded-md"
          justifyContent="space-between"
          style={{
            backgroundColor: 'rgb(88 172 108)',
            padding: '3px',
            width: '25%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="pl-2 grow">
            <Typography
              className="text-xs text-gray-700"
              style={{ fontSize: '0.5rem', marginTop: '2px' }}
            >
              Weather
            </Typography>
            <Typography
              className="text-black font-semibold"
              style={{ fontSize: '0.5rem' }}
            >
              Cloudy
            </Typography>
          </div>
          <img
            src="/cloud.svg"
            alt="Bat"
            style={{
              width: '22px',
              height: 'auto',
              marginLeft: '5px',
            }}
          />
        </Box>

        <Box
          className="flex flex-col items-center p-2 rounded-md"
          style={{
            backgroundColor: 'rgb(88 172 108)',
            padding: '4px',
            width: '25%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            className="text-xs text-gray-700"
            style={{ fontSize: '0.5rem', marginTop: '4px' }}
          >
            Avg. Runs
          </Typography>
          <Typography
            className="text-black font-semibold"
            style={{ fontSize: '0.6rem' }}
          >
            215
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default Field;

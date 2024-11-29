import { useEffect } from 'react';
import PlayerComponent from './playerAvatar';

interface PlayerProps {
  imageSrc: string;
  isSelected: boolean;
  points: number;
  name: string;
  key: number;
}

interface PlayerFormationProps {
  players: PlayerProps[];
  rowData: any[];
  setCountSelected?: React.Dispatch<React.SetStateAction<number>>;
}

const PlayerFormation = ({
  players,
  rowData,
  setCountSelected = () => {},
}: PlayerFormationProps) => {
  return (
    <div className="flex flex-wrap justify-center z-50 relative">
      <div className="w-[90%] flex justify-center">
        <PlayerComponent
          {...players[0]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          {...players[1]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
        <PlayerComponent
          {...players[2]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
        <PlayerComponent
          {...players[3]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          {...players[4]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
        <PlayerComponent
          {...players[5]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
        <PlayerComponent
          {...players[6]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          {...players[7]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
        <PlayerComponent
          {...players[8]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
        <PlayerComponent
          {...players[9]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
        <PlayerComponent
          {...players[10]}
          rowData={rowData}
          setCountSelected={setCountSelected}
        />
      </div>
    </div>
  );
};

export default PlayerFormation;

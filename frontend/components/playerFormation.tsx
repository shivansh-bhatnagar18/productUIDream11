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
  initial1: string;
  initial2: string;
}

const PlayerFormation = ({
  players,
  rowData,
  setCountSelected = () => {},
  initial1,
  initial2,
}: PlayerFormationProps) => {
  return (
    <div className="flex flex-wrap justify-center z-50 relative">
      <div className="w-[90%] flex justify-center">
        <PlayerComponent
          {...players[0]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          {...players[1]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          {...players[2]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          {...players[3]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          {...players[4]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          {...players[5]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          {...players[6]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          {...players[7]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          {...players[8]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          {...players[9]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          {...players[10]}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </div>
    </div>
  );
};

export default PlayerFormation;

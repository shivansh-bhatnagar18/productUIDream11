import { useEffect } from 'react';
import PlayerComponent from './playerAvatar';
import { rowData } from '@/types';

interface PlayerFormationProps {
  players: rowData[];
  rowData: rowData[];
  initial1: string;
  setCountSelected?: React.Dispatch<React.SetStateAction<number>>;
  initial2: string;
}

const PlayerFormation = ({
  players,
  rowData,
  initial1,
  initial2,
  setCountSelected = () => {},
}: PlayerFormationProps) => {
  return (
    <div className="flex flex-wrap justify-center z-50 relative">
      <div className="w-[90%] flex justify-center">
        <PlayerComponent
          key={players[0].key}
          imageSrc={players[0].imageSrc}
          points={players[0].points as number}
          team={players[0].team as number}
          name={players[0].name}
          isSelected={players[0].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          key={players[1].key}
          imageSrc={players[1].imageSrc}
          points={players[1].points as number}
          team={players[1].team as number}
          name={players[1].name}
          isSelected={players[1].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          key={players[2].key}
          imageSrc={players[2].imageSrc}
          points={players[2].points as number}
          team={players[2].team as number}
          name={players[2].name}
          isSelected={players[2].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          key={players[3].key}
          imageSrc={players[3].imageSrc}
          points={players[3].points as number}
          team={players[3].team as number}
          name={players[3].name}
          isSelected={players[3].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          key={players[4].key}
          imageSrc={players[4].imageSrc}
          points={players[4].points as number}
          team={players[4].team as number}
          name={players[4].name}
          isSelected={players[4].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          key={players[5].key}
          imageSrc={players[5].imageSrc}
          points={players[5].points as number}
          team={players[5].team as number}
          name={players[5].name}
          isSelected={players[5].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          key={players[6].key}
          imageSrc={players[6].imageSrc}
          points={players[6].points as number}
          team={players[6].team as number}
          name={players[6].name}
          isSelected={players[6].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
      </div>
      <div className="w-[90%] flex justify-around">
        <PlayerComponent
          key={players[7].key}
          imageSrc={players[7].imageSrc}
          points={players[7].points as number}
          team={players[7].team as number}
          name={players[7].name}
          isSelected={players[7].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          key={players[8].key}
          imageSrc={players[8].imageSrc}
          points={players[8].points as number}
          team={players[8].team as number}
          name={players[8].name}
          isSelected={players[8].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          key={players[9].key}
          imageSrc={players[9].imageSrc}
          points={players[9].points as number}
          team={players[9].team as number}
          name={players[9].name}
          isSelected={players[9].isSelected}
          rowData={rowData}
          setCountSelected={setCountSelected}
          initial1={initial1}
          initial2={initial2}
        />
        <PlayerComponent
          key={players[10].key}
          imageSrc={players[10].imageSrc}
          points={players[10].points as number}
          team={players[10].team as number}
          name={players[10].name}
          isSelected={players[10].isSelected}
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

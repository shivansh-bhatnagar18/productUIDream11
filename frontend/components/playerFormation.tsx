import PlayerComponent from './playerAvatar';

interface PlayerProps {
    imageSrc: string;
    number: number;
    name: string;
}

const PlayerFormation = ({ players }: { players: PlayerProps[] }) => {
    return (
    <div className="flex flex-wrap justify-cente z-50 relative">
        <div className="w-[90%] flex justify-center">
            <PlayerComponent {...players[0]} />
        </div>
        <div className="w-[90%] flex justify-around">
            <PlayerComponent {...players[1]} />
            <PlayerComponent {...players[2]} />
            <PlayerComponent {...players[3]} />
        </div>
        <div className="w-[90%] flex justify-around">
            
            <PlayerComponent {...players[4]} />
            <PlayerComponent {...players[5]} />
            <PlayerComponent {...players[6]} />
        </div>
        <div className="w-[90%] flex justify-around">          
            <PlayerComponent {...players[7]} />
            <PlayerComponent {...players[8]} />
            <PlayerComponent {...players[9]} />
            <PlayerComponent {...players[10]} />
        </div>
    </div>
    );
};

export default PlayerFormation;
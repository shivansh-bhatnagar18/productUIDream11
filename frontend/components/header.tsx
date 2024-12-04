'use client';
import React from 'react';
import Navbar from './navbar';
import Image from 'next/image';
import GraphModal from './graphModal';

interface HeaderProps {
  initial1: string;
  initial2: string;
  team1players: number;
  team2players: number;
}

const Header = ({
  initial1,
  initial2,
  team1players,
  team2players,
}: HeaderProps) => {
  return (
    <div>
      <Navbar />
      <div className="w-screen flex items-center justify-center">
        <div className="w-[80%] sm:w-full flex flex-col justify-center items-center px-5">
          <h1 className="text-white text-4xl sm:text-3xl font-normal leading-[141.667%] tracking-[-1.2px] text-center">
            Create Your Dream Team
          </h1>

          <div className="w-full flex flex-col items-center justify-center px-5">
            <p className="text-white text-xl font-thin leading-[283.333%] tracking-[-0.6px] mt-3 text-center">
              Maximum of 10 players from one team
            </p>

            {/* Main Div containing Player 1 info, Mascot and Player 2 info and a grid Balancing Div */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
              {/* Mascot GIF */}
              <div className="col-span-1 flex justify-center md:justify-start">
                <img
                  src="/videos/mascot.gif"
                  alt="Mascot GIF"
                  className="w-[60%] md:w-[80%] lg:w-[80%] h-auto border-radius-10"
                />
              </div>

              {/* Team 1 */}
              <div className="flex items-center justify-center gap-8 p-4 rounded-lg">
                <Image
                  src={`/teamlogos/${initial1}.svg`}
                  width={72}
                  height={72}
                  alt={`${initial1} logo`}
                  className="rounded-full w-20 h-20"
                />
                <div className="flex flex-col text-center">
                  <h3 className="text-[#EBEBF599] text-lg font-bold leading-[283.333%] tracking-[-0.6px] mt-3">
                    {initial1}
                  </h3>
                  <p className="text-white text-2xl font-bold leading-[283.333%] tracking-[-0.6px] mt-3">
                    {team1players}
                  </p>
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex items-center justify-center gap-8 p-4 rounded-lg">
                <div className="flex flex-col text-center">
                  <h3 className="text-[#EBEBF599] text-lg font-bold leading-[283.333%] tracking-[-0.6px] mt-3">
                    {initial2}
                  </h3>
                  <p className="text-white text-2xl font-bold leading-[283.333%] tracking-[-0.6px] mt-3">
                    {team2players}
                  </p>
                </div>
                <Image
                  src={`/teamlogos/${initial2}.svg`}
                  width={72}
                  height={72}
                  alt={`${initial2} logo`}
                  className="rounded-full w-20 h-20"
                />
              </div>
              {/* Balance div for grid symmetry */}
              <div className="hidden md:block"></div>
              {/* credits div */}
            </div>
            <div className="flex flex-col absolute right-0 w-[22%]">
              {/* <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  Credits Used
                </h3>
                <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  11
                </p> */}
              <GraphModal
                description=""
                data={{}} // Provide appropriate data here
                Heading="Why this Model?"
                Component={() => (
                  <img
                    src="/videos/mascot.gif" // Path relative to the 'public' folder
                    alt="Mascot GIF"
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                      marginTop: '20px',
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

'use client';
import React from 'react';
import Navbar from './navbar';
import Image from 'next/image';

interface HeaderProps {
  initial1: string;
  initial2: string;
}
const Header = ({ initial1, initial2 }: HeaderProps) => {
  return (
    <div>
      <Navbar />
      <div className="w-screen flex items-center justify-center">
        <div className="w-[80%] flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-normal leading-[141.667%] tracking-[-1.2px]">
            Create Your Dream Team
          </h1>

          <div className="w-full flex flex-col items-center justify-center px-5">
            <p className="text-white text-xl font-thin leading-[ 283.333%] tracking-[-0.6px] mt-3">
              Maximum of 10 players from one team
            </p>
            <div className="flex w-full px-10 justify-center">
              {/* players div */}
              {/* <div className="flex flex-col">
                <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  Players
                </h3>
                <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  11 <span className="text-[#EBEBF599] text-lg">/11</span>
                </p>
              </div> */}
              <div className="flex items-center justify-between min-w-[50%] max-w-[50%] ">
                {/* Team 1 */}
                <div className="flex items-center gap-10 w-[40%]">
                  <Image
                    src={`/teamlogos/${initial1}.svg`}
                    width={'72'}
                    height={'72'}
                    alt="/"
                    className="rounded-full w-34 h-34"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      {initial1}
                    </h3>
                    <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      0
                    </p>
                  </div>
                </div>
                {/* Team 2 */}
                <div className="flex items-center gap-10 w-[40%] flex-row-reverse">
                  <Image
                    src={`/teamlogos/${initial2}.svg`}
                    width={'72'}
                    height={'72'}
                    alt="/"
                    className="rounded-full w-34 h-34"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      {initial2}
                    </h3>
                    <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      0
                    </p>
                  </div>
                </div>
              </div>
              {/* credits div */}
            </div>
            <div className="flex flex-col absolute right-0 w-[22%]">
              {/* <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  Credits Used
                </h3>
                <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  11
                </p> */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

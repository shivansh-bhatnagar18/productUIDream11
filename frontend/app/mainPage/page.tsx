'use client';
import Match from '@/components/match';
import Navbar from '@/components/navbar';

export default function Mainpage() {
  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-w-screen min-w-screen">
      <Navbar />
      <div className="w-[80%] flex flex-col justify-center items-center">
        <h1 className="text-white text-4xl font-normal leading-[141.667%] tracking-[-1.2px]">
          Choose Match
        </h1>
        <div className="w-full flex items-center justify-center mt-10">
          <div className="h-[2px] bg-white w-full blur-xs"></div>
          <div className="flex items-center z-10">
            <h2 className="text-white text-2xl font-normal leading-[141.667%] tracking-[-1.2px] bg-red-800 px-20 py-2 rounded-xl">
              LIVE
            </h2>
          </div>
          <div className="h-[2px] bg-white w-full blur-xs"></div>
        </div>

        <div className="bg-white bg-opacity-10  rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-[80%] py-5 px-10 mt-12 shadow-inner shadow-white">
          <Match
            Team1="India"
            Team2="South Africa"
            initial1="IND"
            initial2="SA"
            time="12:00 PM"
          />
          <Match
            Team1="India"
            Team2="South Africa"
            initial1="IND"
            initial2="SA"
            time="12:00 PM"
          />
        </div>
        <div className="w-full flex items-center justify-center mt-10">
          <div className="h-[2px] bg-white w-full blur-xs"></div>
          <div className="flex items-center z-10">
            <h2 className="text-white text-2xl font-normal leading-[141.667%] tracking-[-1.2px] py-2 w-max px-4">
              UPCOMING MATCHES
            </h2>
          </div>
          <div className="h-[2px] bg-white w-full blur-xs"></div>
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white flex flex-col w-[80%] py-5 px-10 my-12 shadow-inner shadow-white">
          <Match
            Team1="India"
            Team2="South Africa"
            initial1="IND"
            initial2="SA"
            time="12:00 PM"
          />
          <Match
            Team1="India"
            Team2="South Africa"
            initial1="IND"
            initial2="SA"
            time="12:00 PM"
          />
          <Match
            Team1="India"
            Team2="South Africa"
            initial1="IND"
            initial2="SA"
            time="12:00 PM"
          />
        </div>
      </div>
    </div>
  );
}

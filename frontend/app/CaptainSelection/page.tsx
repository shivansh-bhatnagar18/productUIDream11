"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import SearchDropdown from "../../components/searchDropdown";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import LoadingBar from "@/components/LoadingBar";
import Field from "@/components/field";
import PlayerTable from "@/components/playerTable";
import 'ag-grid-enterprise'
import Navbar from "@/components/navbar";
import PlayerCard from "@/components/playerCard";
import PlayerStats from "@/components/playerStats";
import CaptainTable from "@/components/captainTable";
import Header from "@/components/header";

function page() {

  return (
    <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-h-screen max-w-screen min-w-screen">
        <Header />
          {/* team selection divs */}
          <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
            <LoadingBar />
          </div>
        <div className="flex w-[95%] mt-10 gap-5">
          <PlayerCard playerName="Virat Kohli" rank={1} />
          {/* <div className="h-[30%] w-[30%]"></div> */}
          <CaptainTable />
          {/* <PlayerTable /> */}
          <PlayerCard playerName="Rohit Sharma" rank={2} />
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl border-2 border-white p-10 flex flex-col items-center mt-24">
            <p className="text-white text-2xl mb-10">Here are our top 3 recommendations</p>
            <div className="flex gap-10">
              <PlayerCard playerName="Virat Kohli" rank={1} />
              <PlayerCard playerName="Rohit Sharma" rank={2} />
              <PlayerCard playerName="Jasprit Bumrah" rank={3} />
            <div />
        </div>
        <div className="flex flex-row justify-center mt-10">
            <Button
                type="button"
                variant="contained"
                color="primary"
                className=""
            >
                Save
            </Button>
            <Button
                type="button"
                variant="contained"
                color="secondary"
                className=""
            >
                Custom
            </Button>
            </div>
        </div>
        </div>
  )
}

export default page
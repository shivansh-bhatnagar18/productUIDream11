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
import Header from "@/components/header";
import CaptainTable from "@/components/captainTable";

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
          <CaptainTable />
          {/* <PlayerTable /> */}
          <PlayerCard playerName="Rohit Sharma" rank={2} />
        </div>
        <div className="flex w-[95%] mt-10 gap-5">
          <PlayerStats />
          <PlayerStats />
        </div>
        <Button
            type="button"
            variant="contained"
            color="primary"
            className=""
          >
            Save
          </Button>
      </div>
  )
}

export default page
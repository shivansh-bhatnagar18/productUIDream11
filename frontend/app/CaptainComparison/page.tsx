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

function page() {
  const lightTheme = createTheme({
    palette: {
      mode: "light", // Set light mode explicitly
      primary: {
        main: "#1976d2", // Customize the primary color
      },
      secondary: {
        main: "#ff4081", // Customize the secondary color
      },
      background: {
        default: "#ffffff", // Set background for light mode
        paper: "#f5f5f5",
      },
      text: {
        primary: "#000000",
        secondary: "#4f4f4f",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#525E74", // Change text color for Button component in light mode
            backgroundColor: "#B0AFAF", // Background color for button
          },
          containedPrimary: {
            color: "#fff",
            backgroundColor: "#F64848", // Primary button background color
            // '&:hover': {
            //     backgroundColor: '#115293',  // Primary button hover color
            // },
          },
          containedSecondary: {
            color: "#525E74",
            backgroundColor: "#B0AFAF", // Secondary button background color
            // '&:hover': {
            //     backgroundColor: '#c60055',  // Secondary button hover color
            // },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Navbar/>
      <div className="flex flex-col items-center bg-[#0D0402] h-full max-w-screen min-w-screen scroll-m-10">
        <div className="w-[80%] flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-normal leading-[141.667%] tracking-[-1.2px]">
            Create Your Dream Team
          </h1>

          <div className="w-full flex flex-col items-center justify-center px-5">
            <p className="text-white text-xl font-thin leading-[ 283.333%] tracking-[-0.6px] mt-3">
              Maximum of 10 players from one team
            </p>
            <div className="flex w-full px-10  justify-between">
              {/* players div */}
              <div className="flex flex-col">
                <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  Players
                </h3>
                <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  11 <span className="text-[#EBEBF599] text-lg">/11</span>
                </p>
              </div>
              <div className="flex items-center justify-between min-w-[50%] max-w-[50%] ">
                {/* Team 1 */}
                <div className="flex items-center gap-10 w-[40%]">
                  <Image
                    src="/india.svg"
                    width={"72"}
                    height={"72"}
                    alt="/"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      IND
                    </h3>
                    <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      0
                    </p>
                  </div>
                </div>
                {/* Team 2 */}
                <div className="flex items-center gap-10 w-[40%] flex-row-reverse">
                <Image src="/SA.svg" width={"72"} height={"72"} alt="/" />
                  <div className="flex flex-col">
                    <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      SA
                    </h3>
                    <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                      0
                    </p>
                  </div>
                </div>
              </div>
              {/* credits div */}
              <div className="flex flex-col">
                <h3 className="text-[#EBEBF599] text-lg font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  Credits Used
                </h3>
                <p className="text-white text-2xl font-bold leading-[ 283.333%] tracking-[-0.6px] mt-3">
                  11
                </p>
              </div>
            </div>
          </div>

          {/* team selection divs */}
          <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
            <LoadingBar />
          </div>
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
    </ThemeProvider>
  )
}

export default page
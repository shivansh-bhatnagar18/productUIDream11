"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import LoadingBar from "@/components/LoadingBar";
import Field from "@/components/field";
import PlayerTable from "@/components/playerTable";
import 'ag-grid-enterprise'
import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function Mainpage() {

  return (
      <div className="flex flex-col items-center bg-[#0D0402] min-h-screen max-h-screen max-w-screen min-w-screen">
        <Header />
          {/* team selection divs */}
        <div className="max-w-[50%] min-w-[50%] mx-auto mt-8">
          <LoadingBar />
        </div>
        <div className="flex flex-row gap-4 m-10 w-[95%] grow">
          <PlayerTable/>
          <Field />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className=""
          >
            Analyse My Pick
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className=""
          >
            AI Expert Team
          </Button>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            className=""
          >
            Next
          </Button>
        </div>
      </div>
  );
}

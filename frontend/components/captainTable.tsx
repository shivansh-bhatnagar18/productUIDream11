'use client';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  ValueGetterParams,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
// import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
// import "ag-grid-community/styles/ag-theme-quartz.css";
import React, { StrictMode, useEffect, useState } from 'react';
import Papa from 'papaparse';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'ag-grid-enterprise';
import { themeQuartz } from '@ag-grid-community/theming';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const CaptainTable = ({ rowData }: { rowData: any[] }) => {
  const myTheme = themeQuartz.withParams({
    accentColor: '#D22A29',
    backgroundColor: '#0D0402',
    browserColorScheme: 'dark',
    chromeBackgroundColor: {
      ref: 'foregroundColor',
      mix: 0.07,
      onto: 'backgroundColor',
    },
    foregroundColor: '#FFF',
    headerFontSize: 14,
  });

  const [isCClicked, setIsCClicked] = useState<{ [key: number]: boolean }>({});
  const [isVCClicked, setIsVCClicked] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCButtonClick = (clickedKey: number) => {
    const updatedClickedState = Object.keys(isCClicked).reduce(
      (acc, key) => {
        acc[Number(key)] = Number(key) === clickedKey;
        return acc;
      },
      {} as { [key: number]: boolean }
    );

    setIsCClicked(updatedClickedState);
  };

  const handleVCButtonClick = (clickedKey: number) => {
    const updatedClickedState = Object.keys(isCClicked).reduce(
      (acc, key) => {
        acc[Number(key)] = Number(key) === clickedKey;
        return acc;
      },
      {} as { [key: number]: boolean }
    );

    setIsVCClicked(updatedClickedState);
  };

  const [columnDefs, setColumnDefs] = useState<
    (ColDef<any, any> | ColGroupDef<any>)[]
  >([
    {
      headerName: 'Selected By',
      cellRenderer: (p: any) => (
        <div className="flex gap-5">
          <img
            src={p.data.imgSrc}
            alt={p.data.name}
            className="w-8 h-8 rounded-full"
          />
          <p>{p.data.name}</p>
        </div>
      ),
      flex: 2,
    },
    {
      field: '%C By',
      cellRenderer: (p: any) => (
        <button
          onClick={() => handleCButtonClick(p.data.key)}
          className={`w-6 h-6 flex items-center justify-center rounded-full text-black border border-gray-300 ${isCClicked[p.data.key] ? 'bg-green-500' : 'bg-white'}`}
        >
          C
        </button>
      ),
      flex: 1,
    },
    {
      field: '%VC By',
      cellRenderer: (p: any) => (
        <button
          onClick={() => handleVCButtonClick(p.data.key)}
          className={`w-6 h-6 flex items-center justify-center rounded-full text-black border border-gray-300 ${isCClicked[p.data.key] ? 'bg-green-500' : 'bg-white'}`}
        >
          VC
        </button>
      ),
      flex: 1,
    },
  ]);
  return (
    // wrapping container with theme & size
    <div className="w-full">
      <div
        style={{ width: '100%', height: '100%' }}
        // className={
        //     "ag-theme-quartz-dark"
        // }
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          theme={myTheme}
        />
      </div>
    </div>
  );
};

export default CaptainTable;

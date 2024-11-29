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

interface CaptainTableProps {
  rowData: any[];
  setRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setCaptainData: React.Dispatch<React.SetStateAction<any[]>>;
  setViceCaptainData: React.Dispatch<React.SetStateAction<any[]>>;
}

const CaptainTable = ({
  rowData,
  setCaptainData,
  setViceCaptainData,
  setRowData,
}: CaptainTableProps) => {
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

  const [selectedCKey, setSelectedCKey] = useState<number | null>(null);
  const [selectedVCKey, setSelectedVCKey] = useState<number | null>(null);

  const handleCButtonClick = (key: number) => {
    setSelectedCKey((prevKey) => (prevKey === key ? null : key));
    setCaptainData(rowData.find((row) => row.key === key) || []);
    setRowData((prevData) =>
      prevData.map((row) =>
        row.key === key
          ? { ...row, isCaptain: true }
          : { ...row, isCaptain: false }
      )
    );
  };

  const handleVCButtonClick = (key: number) => {
    setSelectedVCKey((prevKey) => (prevKey === key ? null : key));
    setViceCaptainData(rowData.find((row) => row.key === key) || []);
    setRowData((prevData) =>
      prevData.map((row) =>
        row.key === key
          ? { ...row, isViceCaptain: true }
          : { ...row, isViceCaptain: false }
      )
    );
  };

  const columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    {
      headerName: 'Selected By',
      cellRenderer: (p: any) => (
        <div className="flex gap-5">
          <img
            src={p.data.imageSrc}
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
        <CButtonRenderer
          data={p.data}
          handleButtonClick={handleCButtonClick}
          isSelected={selectedCKey === p.data.key}
          isCaptain={p.data.isCaptain}
          isViceCaptain={p.data.isViceCaptain}
          isDisabled={selectedVCKey !== null && selectedVCKey === p.data.key}
        />
      ),
      flex: 1,
    },
    {
      field: '%VC By',
      cellRenderer: (p: any) => (
        <VCButtonRenderer
          data={p.data}
          handleButtonClick={handleVCButtonClick}
          isSelected={selectedVCKey === p.data.key}
          isCaptain={p.data.isCaptain}
          isViceCaptain={p.data.isViceCaptain}
          isDisabled={selectedCKey !== null && selectedCKey === p.data.key}
        />
      ),
      flex: 1,
    },
  ];

  if (!rowData || rowData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    // wrapping container with theme & size
    <div className="w-full">
      <div style={{ width: '100%', height: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          theme={myTheme}
        />
      </div>
    </div>
  );
};

const CButtonRenderer = (props: any) => {
  const { data, handleButtonClick, isSelected, isDisabled, isCaptain } = props;

  return (
    <button
      onClick={() => handleButtonClick(data.key)}
      className={`w-6 h-6 flex items-center justify-center rounded-full text-black transition-colors ${
        isCaptain
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-white hover:bg-gray-300 text-black'
      }`}
      disabled={isDisabled}
    >
      C
    </button>
  );
};

const VCButtonRenderer = (props: any) => {
  const { data, handleButtonClick, isSelected, isDisabled, isViceCaptain } =
    props;

  return (
    <button
      onClick={() => handleButtonClick(data.key)}
      className={`w-6 h-6 flex items-center justify-center rounded-full  transition-colors ${
        isViceCaptain
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-white hover:bg-gray-300 text-black'
      }`}
      disabled={isDisabled}
    >
      VC
    </button>
  );
};

export default CaptainTable;

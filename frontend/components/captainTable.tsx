'use client';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import React, { useState } from 'react';
import 'ag-grid-enterprise';
import { themeQuartz } from '@ag-grid-community/theming';
import { rowData } from '@/types';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface CaptainTableProps {
  rowData: rowData[];
  setRowData: React.Dispatch<React.SetStateAction<rowData[]>>;
  setCaptainData: (captain: string) => void;            // Updated type
  setViceCaptainData: (viceCaptain: string) => void;    // Updated type
  setToComparePlayer?: React.Dispatch<React.SetStateAction<string>>;
}

const CaptainTable = ({
  rowData,
  setCaptainData,
  setViceCaptainData,
  setRowData,
  setToComparePlayer,
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

  const [selectedVCKey, setSelectedVCKey] = useState<number | null>(null);
  const [selectedCKey, setSelectedCKey] = useState<number | null>(null);

  const handleCButtonClick = (key: number) => {
    setSelectedCKey((prevKey) => (prevKey === key ? null : key));
    const captain = rowData.find((row) => row.key === key);
    setCaptainData(captain ? (captain.name as string) : '');
    setRowData((prevData) =>
      prevData.map((row) =>
        row.key === key
          ? { ...row, isCaptain: true }
          : { ...row, isCaptain: false }
      )
    );
    localStorage.setItem('rowData', JSON.stringify(rowData));
    localStorage.setItem('captain', JSON.stringify(captain?.name || ''));
    console.log(rowData);
  };

  const handleVCButtonClick = (key: number) => {
    setSelectedVCKey((prevKey) => (prevKey === key ? null : key));
    const viceCaptain = rowData.find((row) => row.key === key);
    setViceCaptainData(viceCaptain ? (viceCaptain?.name as string) : ' ');
    setRowData((prevData) =>
      prevData.map((row) =>
        row.key === key
          ? { ...row, isViceCaptain: true }
          : { ...row, isViceCaptain: false }
      )
    );
    localStorage.setItem('rowData', JSON.stringify(rowData));
    localStorage.setItem(
      'viceCaptain',
      JSON.stringify(viceCaptain?.name || '')
    );
    console.log(rowData);
  };

  const columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    {
      headerName: 'Selected By',
      cellRenderer: (p: any) => (
        <div
          className="flex gap-5"
          onClick={() => {
            rowData.forEach((row, index) => {
              row.toCompare = index === p.node.rowIndex;
            });
            setToComparePlayer && setToComparePlayer(p.data.name);
          }}
        >
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
      <div
        style={{ width: '100%', height: '100%' }}
        className="border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white shadow-inner shadow-white rounded-2xl "
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

const CButtonRenderer = (props: any) => {
  const { data, handleButtonClick, isDisabled, isCaptain } = props;

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
  const { data, handleButtonClick, isDisabled, isViceCaptain } = props;

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

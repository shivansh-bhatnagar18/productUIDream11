'use client';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  ValueGetterParams,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import React, { StrictMode, useEffect, useState } from 'react';
import Papa from 'papaparse';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'ag-grid-enterprise';
import { themeQuartz } from '@ag-grid-community/theming';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const PlayerTable = ({ rowData }: { rowData: any[] }) => {
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

  const handleButtonClick = (key: number) => {
    setIsClicked((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const [isClicked, setIsClicked] = useState<{ [key: number]: boolean }>({});
  const [columnDefs, setColumnDefs] = useState<
    (ColDef<any, any> | ColGroupDef<any>)[]
  >([
    {
      headerName: 'Name',
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
    { field: 'Points', valueFormatter: (p: any) => p.data.points, flex: 1 },
    {
      field: 'Lock/Exclude',
      cellRenderer: () => (
        <div>
          <CloseIcon />
          <LockOpenIcon />
        </div>
      ),
      flex: 1,
    },
    {
      cellRenderer: (p: any) => (
        <button
          onClick={() => handleButtonClick(p.data.key)}
          className={`w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors ${
            isClicked[p.data.key]
              ? `bg-green-500 hover:bg-green-600`
              : `bg-red-500 hover:bg-red-600`
          }`}
        >
          {isClicked[p.data.key] ? '+' : '−'}
        </button>
      ),
      flex: 1,
    },
  ]);

  useEffect(() => {
    const updatedClickedState = rowData.reduce(
      (acc, row) => ({
        ...acc,
        [row.key]: row.isSelected || false,
      }),
      {} as { [key: number]: boolean }
    );
    setIsClicked(updatedClickedState);
  }, [rowData]);

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

export default PlayerTable;

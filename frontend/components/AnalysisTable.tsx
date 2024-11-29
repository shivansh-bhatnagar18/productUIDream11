'use client';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import React, { useEffect, useState } from 'react';
import 'ag-grid-enterprise';
import { themeQuartz } from '@ag-grid-community/theming';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface PlayerTableProps {
  rowData: any[];
}

const AnalysisTable: React.FC<PlayerTableProps> = ({ rowData }) => {
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

  const columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    {
      headerName: 'PLAYERS',
      cellRenderer: (params: any) => {
        if (!params.data) return null;
        return (
          <div className="flex gap-5">
            <img
              src={params.data.imageSrc}
              alt={params.data.name}
              className="w-8 h-8 rounded-full"
            />
            <p>{params.data.name}</p>
          </div>
        );
      },
      flex: 2,
    },
    {
      field: 'PREDICTED POINTS',
      valueFormatter: (params: any) => {
        if (!params.data) return '';
        return params.data.points;
      },
      flex: 1,
    },
  ];

  if (!rowData || rowData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full h-full rounded-3xl">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          theme={myTheme}
        />
      </div>
    </div>
  );
};

export default AnalysisTable;

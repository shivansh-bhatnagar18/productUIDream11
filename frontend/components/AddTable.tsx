// AddTable.tsx
'use client';
import React from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import {
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
  RowClickedEvent,
} from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import 'ag-grid-enterprise';
import { themeQuartz } from '@ag-grid-community/theming';
import { rowData } from '@/types';
import Image from 'next/image';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

interface AddTableProps {
  rowData: rowData[];
  onRowClick: (key: number) => void;
  selectionLimitReached: boolean;
}

const AddTable: React.FC<AddTableProps> = ({
  rowData,
  onRowClick,
  selectionLimitReached,
}) => {
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

  const columnDefs: ColDef[] = [
    {
      headerName: 'PLAYERS',
      field: 'name',
      cellRenderer: (params: ICellRendererParams) => {
        if (!params.data) return null;
        return (
          <div className="flex gap-5">
            <Image
              src={params.data.imageSrc}
              alt={params.data.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <p>{params.data.name}</p>
          </div>
        );
      },
      flex: 2,
    },
    {
      headerName: 'PREDICTED POINTS',
      valueFormatter: (params: ValueFormatterParams) => {
        if (
          !params.data ||
          !params.data.values ||
          !params.data.values.y_pred ||
          params.data.values.y_pred[5] === undefined
        ) {
          return '';
        }
        return Math.round(params.data.values.y_pred[5]).toString();
      },
      flex: 1,
    },
  ];

  const onRowClicked = (event: RowClickedEvent) => {
    if (selectionLimitReached) {
      return;
    }
    const clickedRow = event.data;
    onRowClick(clickedRow.key);
  };

  return (
    <div className="w-full">
      <div className="w-full h-full rounded-3xl">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onRowClicked={onRowClicked}
          theme={myTheme}
          rowSelection="single"
        />
      </div>
    </div>
  );
};

export default AddTable;
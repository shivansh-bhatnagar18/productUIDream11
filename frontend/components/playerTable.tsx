'use client';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, ColGroupDef, ModuleRegistry } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import 'ag-grid-enterprise';
import { themeQuartz } from '@ag-grid-community/theming';
import Papa from 'papaparse';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any @typescript-eslint/no-unused-vars
const readCSVImageData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fetch('/names.csv')
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          complete: (results: Papa.ParseResult<any>) => {
            resolve(results.data);
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error: (error: any) => {
            reject(error);
          },
        });
      })
      .catch((error) => reject(error));
  });
};

interface PlayerTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowData: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setCountSelected: React.Dispatch<React.SetStateAction<number>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setRowData: React.Dispatch<React.SetStateAction<any[]>>;
  setToComparePlayer: React.Dispatch<React.SetStateAction<string>>;
  reverse?: boolean;
}

const PlayerTable: React.FC<PlayerTableProps> = ({
  rowData,
  setRowData,
  setSelectedRowData,
  setCountSelected,
  setToComparePlayer,
  reverse,
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

  const handleButtonClick = (key: number) => {
    const selectedRows = rowData.filter((row) => row.isSelected);
    if (selectedRows.length < 11 || rowData[key].isSelected) {
      rowData[key].isSelected = !rowData[key].isSelected;
      setRowData([...rowData]);
      const updatedSelectedRows = rowData.filter((row) => row.isSelected);
      setSelectedRowData(updatedSelectedRows);
      setCountSelected(updatedSelectedRows.length);
    }
    const selectedRowsFinal = rowData.filter((row) => row.isSelected);
    localStorage.setItem('rowData', JSON.stringify(rowData));
    localStorage.setItem('selectedRowData', JSON.stringify(selectedRowsFinal));
  };

  const handleLockedClick = (key: number) => {
    if (rowData[key].isExclude) {
      rowData[key].isExclude = !rowData[key].isExclude;
    }
    const selectedRows = rowData.filter((row) => row.isSelected);
    if (selectedRows.length < 11 || rowData[key].isSelected) {
      rowData[key].isLocked = !rowData[key].isLocked;
      if (rowData[key].isLocked) {
        rowData[key].isSelected = true;
      }
      setRowData([...rowData]);
      const updatedSelectedRows = rowData.filter((row) => row.isSelected);
      setSelectedRowData(updatedSelectedRows);
      setCountSelected(updatedSelectedRows.length);
      localStorage.setItem('rowData', JSON.stringify(rowData));
      localStorage.setItem(
        'selectedRowData',
        JSON.stringify(updatedSelectedRows)
      );
    }
  };

  const handleExcludeClick = (key: number) => {
    if (rowData[key].isLocked) {
      rowData[key].isLocked = !rowData[key].isLocked;
    }
    rowData[key].isExclude = !rowData[key].isExclude;
    if (rowData[key].isExclude) {
      rowData[key].isSelected = false;
    }
    setRowData([...rowData]);
    const updatedSelectedRows = rowData.filter((row) => row.isSelected);
    setCountSelected(updatedSelectedRows.length);
    setSelectedRowData(updatedSelectedRows);
    localStorage.setItem('rowData', JSON.stringify(rowData));
    localStorage.setItem(
      'selectedRowData',
      JSON.stringify(updatedSelectedRows)
    );
  };

  const reverseData = [...rowData].reverse();
  // Define columnDefs directly inside the component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] = [
    {
      headerName: 'Name',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => {
        if (!params.data) return null;
        return (
          <div
            className="flex gap-5"
            onClick={() => {
              rowData.forEach((row, index) => {
                row.toCompare = index === params.node.rowIndex;
              });
              setToComparePlayer(params.data.name);
            }}
          >
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
      field: 'Points',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueFormatter: (params: any) => {
        if (!params.data) return '';
        const yPred = params.data.values.y_pred;
        return Array.isArray(yPred) && yPred.length > 5
          ? Math.round(yPred[5]).toString()
          : '';
      },
      flex: 1,
    },
    {
      field: 'Lock/Exclude',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => {
        if (!params.data) return null;
        return (
          <div className="flex gap-2">
            {}
            <div
              onClick={() => handleLockedClick(params.data.key)}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                params.data.isLocked ? ' text-red-800' : ' text-white'
              }`}
            >
              <LockOpenIcon
                className={params.data.isLocked ? 'text-red-800' : 'text-white'}
              />
            </div>
            <div
              onClick={() => handleExcludeClick(params.data.key)}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-colors ${
                params.data.isExclude ? ' text-green-800' : ' text-white'
              }`}
            >
              <CloseIcon
                className={
                  params.data.isExclude ? 'text-green-800' : 'text-white'
                }
              />
            </div>
          </div>
        );
      },
      flex: 1,
    },
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cellRenderer: (params: any) => {
        if (!params.data) return null;
        return (
          <ButtonRendererAdd
            data={params.data}
            handleButtonClick={handleButtonClick}
          />
        );
      },
      flex: 1,
    },
  ];

  // Check if rowData is valid before rendering the grid
  if (!rowData || rowData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div
        style={{ width: '100%', height: '100%' }}
        className=" rounded-md border-[1px] border-opacity-10 border-b-black border-l-black border-t-white border-r-white "
      >
        <AgGridReact
          rowData={reverse ? reverseData : rowData}
          columnDefs={columnDefs}
          theme={myTheme}
        />
      </div>
    </div>
  );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ButtonRendererAdd = (props: any) => {
  const { data, handleButtonClick } = props;
  const clicked = data.isSelected;
  const excluded = data.isExclude;

  return excluded ? (
    <button
      disabled
      onClick={() => handleButtonClick(data.key)}
      className={`w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors ${
        clicked
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-500 hover:bg-green-600'
      }`}
    >
      {clicked ? '-' : '+'}
    </button>
  ) : (
    <button
      onClick={() => handleButtonClick(data.key)}
      className={`w-6 h-6 flex items-center justify-center rounded-full text-white transition-colors ${
        clicked
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-500 hover:bg-green-600'
      }`}
    >
      {clicked ? '-' : '+'}
    </button>
  );
};

export default PlayerTable;

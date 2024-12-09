import Papa from 'papaparse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readCSVData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const match = new URLSearchParams(window.location.search).get('match');
    const getMatch = () => {
      switch (match) {
        case 'IND vs SA':
          return '1';
        case 'IND vs SL':
          return '2';
        case 'DC vs RCB':
          return '3';
        default:
          return -1;
      }
    };
    if (getMatch() === -1) {
      reject('Invalid match');
      window.location.href = '/'; // navigate to error page!
      return;
    }
    const idx = getMatch();
    fetch(`/file_${Number(idx) + 3}_final.csv`)
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          complete: (results: Papa.ParseResult<{ [key: string]: string }>) => {
            resolve(results.data);
          },
          error: (error: Error) => {
            reject(error);
          },
        });
      })
      .catch((error) => reject(error));
  });
};
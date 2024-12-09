import Papa from 'papaparse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readCSVData = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const match = new URLSearchParams(window.location.search).get('match');
    const getMatch = () => {
      switch (match) {
        case 'CSK vs PW':
          return '1';
        case 'AUS vs PAK':
          return '2';
        case 'ENG vs SA':
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
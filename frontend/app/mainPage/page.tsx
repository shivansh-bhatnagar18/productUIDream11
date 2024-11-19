'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import SearchDropdown from "../../components/searchDropdown";
import { Button } from '@mui/material';
import Link from 'next/link';

export default function Mainpage() {

    const lightTheme = createTheme({
        palette: {
          mode: 'light',  // Set light mode explicitly
          primary: {
            main: '#1976d2',  // Customize the primary color
          },
          secondary: {
            main: '#ff4081',  // Customize the secondary color
          },
          background: {
            default: '#ffffff',  // Set background for light mode
            paper: '#f5f5f5',
          },
          text: {
            primary: '#000000',
            secondary: '#4f4f4f',
          },},
          components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: '#525E74',   // Change text color for Button component in light mode
                        backgroundColor: '#B0AFAF',  // Background color for button
                    },
                    containedPrimary: {
                        color: '#fff',
                        backgroundColor: '#F64848',  // Primary button background color
                        // '&:hover': {
                        //     backgroundColor: '#115293',  // Primary button hover color
                        // },
                    },
                    containedSecondary: {
                        color: '#525E74',
                        backgroundColor: '#B0AFAF',  // Secondary button background color
                        // '&:hover': {
                        //     backgroundColor: '#c60055',  // Secondary button hover color
                        // },
                    },
                },
            },
          }
      });

  return (
    <ThemeProvider theme={lightTheme}>
        <CssBaseline />
            <div className = "flex flex-col items-center">
                <div className = "flex flex-row gap-4">
                    <Button type="submit" variant="contained" color="secondary" className="mt-10">
                        Analyse My Pick
                    </Button>
                    <Button type="button" variant="contained" color="primary" className="mt-10">
                        AI Expert Team
                    </Button>
                    <Button type="button" variant="contained" color="secondary" className="mt-10">
                        Next
                    </Button>
                </div>
            </div>
    </ThemeProvider>
  );
}
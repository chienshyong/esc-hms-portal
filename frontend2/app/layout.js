"use client"
import './globals.css'
import { ThemeProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/config/theme';


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <title>ESC Project 3</title>
        <meta name="A service request platform" content="Made by group C414" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
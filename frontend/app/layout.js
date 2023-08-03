"use client"
import './globals.css'
import { ThemeProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/config/theme';
import { SessionProvider } from "next-auth/react"

export default function RootLayout({children, session}) {
  return (
    <html lang="en">
      <head>
        <title>ESC Project 3</title>
        <meta name="A service request platform" content="Made by group C414" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <body>        
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
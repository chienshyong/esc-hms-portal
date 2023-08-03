"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'HMS Portal',
//   description: 'Created by Group C414',
// }

export default function RootLayout({ children, session }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
      </body>
    </html>
  )
}

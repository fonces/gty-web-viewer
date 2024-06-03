'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import "./globals.css";
import AppBar from '@/components/AppBar'
import { ScoresProvider } from '@/hooks/scores'
import { TablesProvider } from '@/hooks/tables'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <ScoresProvider>
          <TablesProvider>
            <AppRouterCacheProvider>
              <AppBar />
              {children}
            </AppRouterCacheProvider>
          </TablesProvider>
        </ScoresProvider>
      </body>
    </html>
  )
}

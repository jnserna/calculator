import type { Metadata, Viewport } from 'next'
import './globals.css'
import { LoanProvider } from '@/context/LoanContext'

export const metadata: Metadata = {
  title: 'Paloan',
  description: 'Calculadora de amortización de préstamos',
}

export const viewport: Viewport = {
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-light min-h-screen">
        <LoanProvider>
          <div className="max-w-lg mx-auto min-h-screen flex flex-col bg-white shadow-xl">
            {children}
          </div>
        </LoanProvider>
      </body>
    </html>
  )
}

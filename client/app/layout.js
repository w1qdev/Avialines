import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'URTK Avialines | Admin Panel',
  description: 'Admin Panel for URTK Avialines',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}

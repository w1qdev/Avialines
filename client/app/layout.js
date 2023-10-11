import './globals.css'

export const metadata = {
  title: 'URTK Avialines | Admin Panel',
  description: 'Admin Panel for URTK Avialines',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

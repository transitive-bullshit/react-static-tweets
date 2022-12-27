import '../styles/globals.css'

// core styles shared by all of react-static-tweets (required)
import 'react-static-tweets/styles.css'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}

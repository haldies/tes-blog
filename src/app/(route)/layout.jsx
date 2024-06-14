
import '../globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/providers/AuthProvider'
import { Toaster } from '@/components/ui/toaster'



import Footer from './_components/footer/Footer'
import Navbar from './_components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Goodpets',
  description: 'The best Goodpets',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="">
        <Toaster />
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
      
    </html>
  )
}

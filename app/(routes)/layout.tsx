import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Main from '@components/main';
import Header from '@components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CineRate',
  description: 'CineRate: Rating, Reviews and more with IMDb',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <Main>{children}</Main>
      </body>
    </html>
  );
}

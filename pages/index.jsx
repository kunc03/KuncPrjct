import Image from 'next/image';
import { Inter } from 'next/font/google';
import HomePage from '@/components/pages/HomePage';
import Navbar from '@/components/pages/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <HomePage />
      </main>
    </>
  );
}

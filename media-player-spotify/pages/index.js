import Head from 'next/head'
import SideBar from '../components/SideBar'
import { MusicNoteIcon } from '@heroicons/react/outline'
import Center from '../components/Center'

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>MBMedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex'>
        <SideBar />
        <Center />
      </main>

      <div>
        {/* Player */}
      </div>
    </div>
  )
}

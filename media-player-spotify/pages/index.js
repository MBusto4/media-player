import Head from 'next/head'
import SideBar from '../components/SideBar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

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


export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session: session
    }
  }
}
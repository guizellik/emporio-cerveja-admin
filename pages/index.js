import Head from 'next/head'
import Login from '../pages/Login'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />

    </div>
  )
}

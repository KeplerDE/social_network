// pages/index.js

import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Welcome to my Next.js App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className='display-1 text-center py-5'>Welcome to my Next.js App</h1>
        <img src='/images/default.jpg' alt='image' />
        <p>This is the start page of my Next.js application.</p>
      </main>

      <footer>
        <p>Footer content goes here.</p>
      </footer>
    </div>
  );
}

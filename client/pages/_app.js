import "bootstrap/dist/css/bootstrap.min.css";
import App from 'next/app';
import Nav from "../components/Nav";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/css/styles.css" />
        </Head>
        <Nav />
        <Component {...pageProps} />
      </>
    );
  }
  
  export default MyApp;
import "bootstrap/dist/css/bootstrap.min.css";
import App from 'next/app';
import Nav from "../components/Nav";
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function MyApp({ Component, pageProps }) {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/css/styles.css" />
        </Head>
        <Nav />
        <ToastContainer position="top-center" />
        <Component {...pageProps} />
      </>
    );
  }
  
  export default MyApp;
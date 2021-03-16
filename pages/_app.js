import { ToastContainer } from 'react-toastify';

import GlobalProvider from '../context'

import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return <GlobalProvider>
    <ToastContainer />
    <Component {...pageProps} />
  </GlobalProvider>
}

export default MyApp

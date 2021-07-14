import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PopupsContextProvider } from '../context/PopupContext';
function MyApp({ Component, pageProps }: AppProps) {
  return <PopupsContextProvider>
    <Component {...pageProps} />
  </PopupsContextProvider>
}
export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PopupsContextProvider } from '../context/PopupContext';
import { AuthProvider, ProtectRoute } from '../context/auth.js'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <ProtectRoute>
      <PopupsContextProvider>
        <Component {...pageProps} />
      </PopupsContextProvider>
    </ProtectRoute>
  </AuthProvider >
}
export default MyApp

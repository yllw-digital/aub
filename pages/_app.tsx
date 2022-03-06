import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PopupsContextProvider } from '../context/PopupContext';
import { AuthProvider, ProtectRoute } from '../context/auth.js'
import { SidebarContextProvider } from '../context/SidebarContext';

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <ProtectRoute>
      <PopupsContextProvider>
        <SidebarContextProvider>
          <Component {...pageProps} />
        </SidebarContextProvider>
      </PopupsContextProvider>
    </ProtectRoute>
  </AuthProvider >
}
export default MyApp

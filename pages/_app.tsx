import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PopupsContextProvider } from '../context/PopupContext';
import { AuthProvider, ProtectRoute } from '../context/auth.js'
import { SidebarContextProvider } from '../context/SidebarContext';
import Layout from '../components/Layout';
function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <ProtectRoute>
      <PopupsContextProvider>
        <SidebarContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SidebarContextProvider>
      </PopupsContextProvider>
    </ProtectRoute>
  </AuthProvider >
}
export default MyApp

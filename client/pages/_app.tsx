import '../styles/globals.css'
import type { AppProps } from 'next/app'

//import {DataProvider} from '../contexts/listdata';
//import {AuthProvider} from '../contexts/auth';

import {
  DataProvider,
  AuthProvider,
} from '../contexts';


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
      <AuthProvider>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp

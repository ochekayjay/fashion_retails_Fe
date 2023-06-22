import '@/styles/globals.css'
import { useEffect,useState } from 'react';
import type { AppProps } from 'next/app'
import { ContextProvider } from '@/context/context'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();

  


  return (
      <ContextProvider>
          <Component {...pageProps} />
      </ContextProvider>
  
  )
  
}

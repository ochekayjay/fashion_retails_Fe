import '@/styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { ContextProvider } from '@/context/context'
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();


/**
 * 
 *   // Restore scroll position on route change
  useEffect(() => {
    const scrollKey = router.pathname?`scrollPosition_${router.pathname}`:'';
    const key = window.sessionStorage.getItem(scrollKey)
    console.log(key)
    console.log('top')
    const keystring = window.sessionStorage.getItem(scrollKey)
     if(keystring){
      const storedPosition = parseInt(keystring);
      if (!isNaN(storedPosition)) {
        setTimeout(() => {
          window.scrollTo(0, storedPosition);
        }, 0);
      }
     }
    
  }, [router.pathname]);


  // Store scroll position in session storage on route change
  useEffect(() => {
    const handleRouteChange = () => {
      const scrollKey = `scrollPosition_${router.pathname}`;
      const key = window.sessionStorage.getItem(scrollKey)
      console.log(key)
      console.log('bottom')
      const scrollString = window.scrollY.toString()
      sessionStorage.setItem(scrollKey,scrollString);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, router.pathname]);
 * 
 */


  return (
      <ContextProvider>
          <Component {...pageProps} />
      </ContextProvider>
  
  )
  
}

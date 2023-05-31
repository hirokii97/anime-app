import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useSearch } from '@/hooks/useSearch'

export default function App({ Component, pageProps }: AppProps) {
  const search = useSearch();
  return <Component {...pageProps} {...search}/>
}
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import { useSearch } from "@/hooks/useSearch";
// import { useResult } from "@/hooks/useResult";

export default function App({ Component, pageProps }: AppProps) {
  // const search = useSearch();
  // const result = useResult();

  return <Component {...pageProps} />;
}

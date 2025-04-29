import "@/styles/globals.css";
import type { AppProps } from "next/app";

// This is the main entry point for a Next.js application
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>Global Header</header>
      <Component {...pageProps} />
    </>
  );
}

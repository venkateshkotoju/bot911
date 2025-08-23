import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <FavoritesProvider>
      <ComparisonProvider>
        <Component {...pageProps} />
      </ComparisonProvider>
    </FavoritesProvider>
  )
}

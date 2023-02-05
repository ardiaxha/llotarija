import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import { Toaster } from 'react-hot-toast'

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Component {...pageProps} />
      <Toaster />
    </ThirdwebProvider>
  )
}

export default MyApp

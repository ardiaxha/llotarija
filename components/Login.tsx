import { useMetamask } from '@thirdweb-dev/react'
import React from 'react'

function Login() {
  const connectWithMetamask = useMetamask()
  return (
    <div className="bg-[#004795] min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center mb-0">
        <img
          className="w-full h-full rounded-full mb-0"
          src="https://cdn.countryflags.com/thumbs/kosovo/flag-round-250.png"
          alt=""
        />
      </div>
      <h1 className="text-6xl text-white font-bold text-center">
        LLotaria E Kosoves
      </h1>
      <h1 className="text-white">
        Filloni duke kyqur ne llogarin tuaj me Metamask
      </h1>
      <button
        onClick={connectWithMetamask}
        className="mt-10 bg-[#fdc800] py-5 px-8 rounded-lg shadow-lg font-bold text-white text-center"
      >
        Kyqu duke perdorur Metamask
      </button>
    </div>
  )
}

export default Login

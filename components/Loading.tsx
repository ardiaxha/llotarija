import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import Footer from './Footer'

function Loading() {
  return (
    <div className="bg-[#004795] h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-x-2 mb-10">
        <img
          className="rounded-full h-20 w-20"
          src="https://cdn.countryflags.com/thumbs/kosovo/flag-round-250.png"
        ></img>
        <h1 className="text-lg text-white"> Duke procesuar kyqjen tuaj...</h1>
      </div>
      <PropagateLoader color="white" size={20} />
      <Footer />
    </div>
  )
}

export default Loading

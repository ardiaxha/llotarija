import React, { useEffect, useState } from 'react'
import NavButton from './NavButton'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'
import { useDisconnect, useAddress } from '@thirdweb-dev/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
function Header() {
  const address = useAddress()
  const disconnect = useDisconnect()
  const [dropdownOpen, setdropdownOpen] = useState(false)

  {
    /* Get the current route */
  }
  const router = useRouter()
  const currentRoute = router.pathname

  return (
    <header className="grid grid-cols-2 md:grid-cols-5 justify-between items-center p-2 max-w-7xl m-auto">
      <div className="flex items-center space-x-2">
        <img
          className="rounded-full h-16 w-16"
          src="https://cdn.countryflags.com/thumbs/kosovo/flag-round-250.png"
          alt=""
        />
        <div>
          <h1 className="text-lg text-white"> Llotarija e Kosoves</h1>
          <p className="text-xs text-emerald-500 truncate">
            Llogaria: {address?.substring(0, 5)}...
            {address?.substring(address.length, address.length - 5)}
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center rounded-lg md:col-span-3">
        <div className="bg-[#002b59] p-4 space-x-2 rounded-lg flex items-center">
          {/* Render Link */}
          <Link href="/">
            <div
              className={
                router.asPath == '/'
                  ? 'bg-[#004795] hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                  : 'hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
              }
            >
              Blej Tiketa
            </div>
          </Link>

          <Link href="ofertat">
            <div
              className={
                router.asPath == '/ofertat'
                  ? 'bg-[#004795] hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                  : 'hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
              }
            >
              Ofertat
            </div>
          </Link>
          <NavButton onClick={disconnect} title="Shkyqu" />
          {/* Render Link */}
          <Link href="tiketat">
            <div
              className={
                router.asPath == '/tiketat'
                  ? 'bg-[#004795] hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                  : 'hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
              }
            >
              Tiketat
            </div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col ml-auto text-right">
        <Bars3BottomRightIcon
          className="h-8 w-8 mx-auto text-white cursor-pointer"
          onClick={() => setdropdownOpen(!dropdownOpen)}
        ></Bars3BottomRightIcon>
        <span className="md:hidden">
          <NavButton onClick={disconnect} title="Shkyqu"></NavButton>
        </span>
      </div>

      <div
        className={`${
          dropdownOpen
            ? `top-20 opacity-100 visible`
            : 'top-[110%] invisible opacity-0'
        } absolute left-0 z-40 mt-2 w-full  transition-all`}
      >
        <div className=" md:hidden items-center justify-center rounded-lg md:col-span-3">
          <div className="bg-[#002b59] p-4 space-x-2 rounded-lg flex items-center">
            {/* Render Link */}
            <Link href="/">
              <div
                className={
                  router.asPath == '/'
                    ? 'bg-[#004795] hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                    : 'hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                }
              >
                Blej Tiketa
              </div>
            </Link>

            <Link href="ofertat">
              <div
                className={
                  router.asPath == '/ofertat'
                    ? 'bg-[#004795] hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                    : 'hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                }
              >
                Ofertat
              </div>
            </Link>
            <NavButton onClick={disconnect} title="Shkyqu" />
            {/* Render Link */}
            <Link href="tiketat">
              <div
                className={
                  router.asPath == '/tiketat'
                    ? 'bg-[#004795] hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                    : 'hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold cursor-pointer'
                }
              >
                Tiketat
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractRead,
  contractType,
  useContractWrite,
} from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Login from '../components/Login'
import PropagateLoader from 'react-spinners/PropagateLoader'
import Loading from '../components/Loading'
import AdminControls from '../components/AdminControls'
import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import CountdownTimer from '../components/CountdownTimer'
import toast from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  const address = useAddress()
  const [userTickets, setUserTickets] = useState(0)

  const [quantity, setQuantity] = useState(0)
  const { contract, isLoading, error } = useContract(
    '0x4c41Da5bc9867A122B4d42aF1Ef6d1E8198b1Ea4'
  )

  const { data: remainingTickets } = useContractRead(
    contract,
    'RemainingTickets'
  )
  const { data: currentWinningReward } = useContractRead(
    contract,
    'CurrentWinningReward'
  )
  const { data: ticketPrice } = useContractRead(contract, 'ticketPrice')
  const { data: ticketCommission } = useContractRead(
    contract,
    'ticketCommission'
  )
  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    'WithdrawWinnings'
  )

  const { data: tickets } = useContractRead(contract, 'getTickets')
  const { data: expiration } = useContractRead(contract, 'expiration')

  const { mutateAsync: BuyTickets } = useContractWrite(contract, 'BuyTickets')

  const { data: winnings } = useContractRead(
    contract,
    'getWinningsForAddress',
    address
  )
  const { data: lastWinner } = useContractRead(contract, 'lastWinner')

  const { data: lastWinnerAmount } = useContractRead(
    contract,
    'lastWinnerAmount'
  )

  const { data: isLotteryOperator } = useContractRead(
    contract,
    'lotteryOperator'
  )

  useEffect(() => {
    if (!tickets) return
    const totalTickets: string[] = tickets
    const noOfUserTickers = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    )
    setUserTickets(noOfUserTickers)
  }, [tickets, address])

  const handleClick = async () => {
    if (!ticketPrice) return
    const notification = toast.loading('Buying your tickets...')

    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
              Number(ethers.utils.formatEther(ticketPrice)) * quantity
            ).toString()
          ),
        },
      ])

      toast.success('Ju keni blere tiketat me sukses!', {
        id: notification,
      })
    } catch (err) {
      toast.error('whoops something went wrong', {
        id: notification,
      })

      console.error('contract call failuere', err)
    }
  }
  const onWithdrawWinnings = async () => {
    const notification = toast.loading('Duke terhiqur perfitimet...')
    try {
      const data = await WithdrawWinnings([{}])
      toast.success('Ju keni blere tiketat me sukses!', {
        id: notification,
      })
    } catch (err) {
      toast.error('whoops something went wrong', {
        id: notification,
      })
    }
  }
  if (isLoading) return <Loading />
  if (!address) return <Login />
  return (
    <div className="bg-[#004795] min-h-[150vh] flex flex-col">
      <Head>
        <title>Llotarija E Kosoves </title>
        <link
          rel="icon"
          href="https://cdn.countryflags.com/thumbs/kosovo/flag-round-250.png"
        ></link>
      </Head>

      <div className="flex-1">
        <Header />
        <Marquee className="bg-[#003977] p-5 mb-5" gradient={false} speed={100}>
          <div className="flex space-x-2 mx-10">
            <h4 className="text-white font-bold">
              Fituesi I fundit: ...{lastWinner?.toString()}
            </h4>
            <h4 className="text-white font-bold">
              Shuma e Fituar: {''}
              {''}
              {lastWinnerAmount &&
                ethers.utils.formatEther(lastWinnerAmount?.toString())}
              {''}Goerli
            </h4>
          </div>
        </Marquee>
        {isLotteryOperator === address && (
          <div>
            <div className="flex justify-center">
              <AdminControls></AdminControls>
            </div>
          </div>
        )}

        {winnings > 0 && (
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
            <button
              onClick={onWithdrawWinnings}
              className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full"
            >
              <p className="font-bold">
                Ju keni fituar llotarine per kete round!
              </p>
              <p>
                Gjithsej te fituara:{' '}
                {ethers.utils.formatEther(winnings.toString())}
                {''} Goerli
              </p>
              <br />
              <p>Terhiqni Perfitimet</p>
            </button>
          </div>
        )}

        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5 max-w-7xl m-auto">
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center mb-2">
              Roundi Aktual I Llotarise
            </h1>
            <div className="flex justify-between p-2 space-x-2">
              <div className="stats">
                <h2 className="text-sm">Perfitimet:</h2>
                <p className="text-xl">
                  {currentWinningReward &&
                    ethers.utils.formatEther(currentWinningReward.toString())}
                  {''} Goerli
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tiketa te mbetura</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>

          <div className="stats-container space-y-2 max-w-2xl">
            <div className="stats-container space-y-2">
              <div className="flex justify-between items-center text-white pb-2">
                <h2 className="">Qmimi I Tiketes:</h2>
                <p>
                  {ticketPrice &&
                    ethers.utils.formatEther(ticketPrice.toString())}
                  {''} Goerli
                </p>
              </div>
              <div className="flex text-white items-center space-x-2 bg-[#002b59] border-[#002b59] rounded-lg border p-4">
                <p>TICKETS</p>
                <input
                  className="flex w-full bg-transparent text-right outline-none text-white"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-white text-xs italic">
                  <p>Qmimi Total I Tiketave</p>
                  <p>
                    {ticketPrice &&
                      Number(
                        ethers.utils.formatEther(ticketPrice?.toString())
                      ) * quantity}{' '}
                    {''} Goerli
                  </p>
                </div>
                <div className="flex items-center justify-between text-white text-xs  italic">
                  <p>Qmimi I Sherbimit</p>
                  <p>
                    {ticketCommission &&
                      ethers.utils.formatEther(ticketCommission.toString())}
                    {''} Goerli
                  </p>
                </div>

                <div className="flex items-center justify-between text-white text-xs italic">
                  <p>+ NETWORK FEES</p>
                  <p>TBC</p>
                </div>
              </div>
              <button
                disabled={
                  expiration?.toString() < Date.now().toString() ||
                  remainingTickets?.toNumber() === 0
                }
                onClick={handleClick}
                className="font-semibold mt-5 w-full bg-[#fdc800]  px-10 py-5 rounded-md text-white
            shadow-xl disabled:from-gray-600 disabled:text-gray-100 disabled:to-gray-600 disabled:cursor-not-allowed"
              >
                Blej {quantity} tiketa per{' '}
                {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice.toString())) *
                    quantity}{' '}
                {''} Goerli
              </button>
            </div>

            {userTickets > 0 && (
              <div className="stats">
                <p className="text-lg mb-2">
                  Ju keni {userTickets} Tiketa ne kete draw
                </p>
                <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                  {Array(userTickets)
                    .fill('')
                    .map((_, index) => (
                      <p
                        className="text-emerald-300 h-20 w-12 bg-emerald-500/30 flex flex-shrink-0 items-center justify-center text-xs italic rounded"
                        key={index}
                      >
                        {index + 1}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home

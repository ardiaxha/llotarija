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
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import Footer from '../components/Footer'

const Tiketat: NextPage = () => {
  const address = useAddress()
  const [userTickets, setUserTickets] = useState(0)
  const [noticket, nosetTicket] = useState(0)

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
    const noOfTickers = totalTickets.reduce((total) => total, 0)

    nosetTicket(noOfTickers)
    setUserTickets(noOfUserTickers)
  }, [tickets, address])
  console.log(noticket)

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

  Chart.register(ArcElement, Tooltip, Legend)
  const labels = ['Gjithsej Tiketa', 'Tiketa te mbetura', 'Tiketat e tua']
  const data = {
    labels: labels,
    datasets: [
      {
        data: [10000, remainingTickets?.toNumber(), userTickets],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 59, 14)',
        ],
        borderWidth: 1,
        hoverBorderWidth: 8,
        hoverBorderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 59, 14)',
        ],
      },
    ],
  }
  const chartOptions = {
    responsive: true,

    scales: {
      xAxes: [
        {
          stacked: true,
          barPercentage: 0.2,
        },
      ],
      yAxes: [
        {
          stacked: true,
          barPercentage: 0.2,
        },
      ],
    },
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
                  {userTickets >= 0 && (
                    <div className="stats">
                      <p className="text-lg text-center mb-2">
                        Ju nuk keni asnje tiket per kete round
                      </p>
                      <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2"></div>
                    </div>
                  )}
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tiketa te mbetura</h2>
                <p className="text-xl">
                  <div className="stats text-center">
                    {remainingTickets?.toNumber()}
                  </div>
                </p>
              </div>
            </div>
            <div className="mt-5 mb-3 w-96 h-96">
              <div className="relative">
                <Doughnut
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },

                      title: {
                        display: true,
                        text: 'Chart',
                      },
                    },
                  }}
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Tiketat

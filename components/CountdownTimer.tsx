import React from 'react'
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractRead,
  contractType,
} from '@thirdweb-dev/react'
import Countdown from 'react-countdown'

function CountdownTimer() {
  const { contract, isLoading, error } = useContract(
    '0x4c41Da5bc9867A122B4d42aF1Ef6d1E8198b1Ea4'
  )
  const { data: expiration, isLoading: isLoadingExpiration } = useContractRead(
    contract,
    'expiration'
  )

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <div className="text-white text-xl text-center">
          <h2 className="animate-pulse mb-2">
            Shitja e tiketave per kete round ka mbaruar!
          </h2>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown animate-pulse">{days}</div>
              <div className="countdown-label">ore</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">{hours}</div>
              <div className="countdown-label">ore</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">{minutes}</div>
              <div className="countdown-label">minuta</div>
            </div>
            <div className="flex-1">
              <div className="countdown animate-pulse">{seconds}</div>
              <div className="countdown-label">sekonda</div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h3 className="text-white text-sm mb-2 italic">Time Remaining</h3>
          <div className="flex space-x-6">
            <div className="flex-1">
              <div className="countdown animate-pulse">{days}</div>
              <div className="countdown-label">Dite</div>
            </div>
            <div className="flex-1">
              <div className="countdown">{hours}</div>
              <div className="countdown-label">ore</div>
            </div>
            <div className="flex-1">
              <div className="countdown">{minutes}</div>
              <div className="countdown-label">minuta</div>
            </div>
            <div className="flex-1">
              <div className="countdown">{seconds}</div>
              <div className="countdown-label">sekonda</div>
            </div>
          </div>
        </div>
      )
    }
  }
  return <Countdown date={new Date(expiration * 1000)} renderer={renderer} />
}

export default CountdownTimer

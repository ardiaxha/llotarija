import {
  ArrowPathIcon,
  ArrowUturnDownIcon,
  CurrencyDollarIcon,
  StarIcon,
} from '@heroicons/react/24/solid'
import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractRead,
  contractType,
  useContractWrite,
} from '@thirdweb-dev/react'
import React from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'

function AdminControls() {
  const { contract, error } = useContract(
    '0x4c41Da5bc9867A122B4d42aF1Ef6d1E8198b1Ea4'
  )

  const { data: totalComission } = useContractRead(
    contract,
    'operatorTotalCommission'
  )

  const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract,
    'DrawWinnerTicket'
  )

  const { mutateAsync: RefundAll } = useContractWrite(contract, 'RefundAll')
  const { mutateAsync: restartDraw } = useContractWrite(contract, 'restartDraw')
  const { mutateAsync: WithdrawCommission } = useContractWrite(
    contract,
    'WithdrawCommission'
  )

  const drawWinner = async () => {
    const notification = toast.loading('Duke zgjedhur perfituesing!')
    try {
      const data = await DrawWinnerTicket([{}])
      toast.success('Perfituesi eshte zgjidhur!', {
        id: notification,
      })
    } catch (err) {
      toast.error('diqka shkoi gabim', {
        id: notification,
      })
    }
  }

  const onRestartDraw = async () => {
    const notification = toast.loading('Duke restartuat llotarin..')
    try {
      const data = await restartDraw([{}])
      toast.success('Llotaria u restartua Me sukses!', {
        id: notification,
      })
    } catch (err) {
      toast.error('diqka shkoi gabim', {
        id: notification,
      })
    }
  }

  const onRefundAll = async () => {
    const notification = toast.loading('Duke terhiqur parat tek klientat..')
    try {
      const data = await RefundAll([{}])
      toast.success('Me sukses!', {
        id: notification,
      })
    } catch (err) {
      toast.error('diqka shkoi gabim', {
        id: notification,
      })
    }
  }

  const onWithdrawCommission = async () => {
    const notification = toast.loading('Duke terhiqur perfitimet..')
    try {
      const data = await WithdrawCommission([{}])
      toast.success('Perfitimet u terhoqen me sukses!', {
        id: notification,
      })
    } catch (err) {
      toast.error('diqka shkoi gabim', {
        id: notification,
      })
    }
  }
  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
      <h2 className="font-bold">AdminControls</h2>
      <p className="mb-2">
        Perfitimet totale per te terhiqur: {''}
        {totalComission && ethers.utils.formatEther(totalComission?.toString())}
        {''}
      </p>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <button onClick={drawWinner} className="admin-button">
          <StarIcon className="h-6 mx-auto mb-2" /> Terhiq Fituesin E Lotaris
        </button>
        <button onClick={onWithdrawCommission} className="admin-button">
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" /> Nxerri Perfitimet
        </button>
        <button onClick={onRestartDraw} className="admin-button">
          <ArrowPathIcon className="h-6 mx-auto mb-2" /> Restarto LLotarin
        </button>
        <button onClick={onRefundAll} className="admin-button">
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Ktheji Gjitha Parat Klientave
        </button>
      </div>
    </div>
  )
}

export default AdminControls

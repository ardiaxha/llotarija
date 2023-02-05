import React from 'react'
interface Props {
  title: string
  isActive?: boolean
  onClick?: () => void
}
function NavButton({ title, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        (isActive && 'bg-[#004795]') ?? ''
      } hover:bg-[#004795]  py-2 px-4 text-white rounded font-bold`}
    >
      {title}
    </button>
  )
}

export default NavButton

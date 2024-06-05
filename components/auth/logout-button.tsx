'use client'

import { logout } from '@/actions/auth/logout'

interface LogoutButtonProps {
  children: React.ReactNode
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
  const handleClick = () => {
    logout()
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  )
}

export default LogoutButton

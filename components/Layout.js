import Nav from "@/components/Nav"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Logo from "./Logo"

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false)

  return (
    <div className="bg-alt min-h-screen">
      <div className="hidden md:flex md:items-center md:p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="bg-alt min-h-screen flex">
        <Nav show={showNav} />
        <div className="w-full flex-grow bg-[#fff] mt-2 mx-2 mb-2 rounded-lg p-10 md:p-2 md:py-6">
          {children}
        </div>
      </div>
    </div>
  )
}

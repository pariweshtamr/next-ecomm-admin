import Nav from "@/components/Nav"
import { signIn, useSession } from "next-auth/react"

export default function Layout({ children }) {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="bg-alt w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-gray-200 p-2 px-4 rounded-md"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-alt min-h-screen flex">
      <Nav className="w-[25%]" />
      <div className="w-[75%] flex-grow bg-[#fff] mt-2 mr-2 mb-2 rounded-lg p-10">
        {children}
      </div>
    </div>
  )
}

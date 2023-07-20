import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RingLoader } from "react-spinners"

const Home = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    await signIn("google")
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      return
    } else if (status === "authenticated") {
      setIsLoading(true)
      router.push(`/dashboard`)
    }
  }, [status, session, router])

  return (
    <div className="bg-alt w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <button
          className="bg-gray-200 p-2 px-4 rounded-md"
          onClick={handleLogin}
        >
          Login with Google
        </button>

        {isLoading && (
          <div className="loader flex justify-center w-full mt-4">
            <RingLoader color="#0071bb" size={40} />
          </div>
        )}
      </div>
    </div>
  )
}
export default Home

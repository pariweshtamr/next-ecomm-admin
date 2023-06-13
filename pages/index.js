import Layout from "@/components/Layout"
import { getSession, useSession } from "next-auth/react"
import Image from "next/image"

const Home = () => {
  const { data: session } = useSession()

  return (
    <Layout>
      <div className="text-[#0c0c0c] flex justify-between">
        <h2>
          Hello, <b>{session?.user?.name}</b>{" "}
        </h2>
        <div className="flex items-center bg-white text-black rounded-full">
          <Image
            src={session?.user?.image}
            alt="profile-img"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="px-4">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }
  return {
    props: {},
  }
}
export default Home

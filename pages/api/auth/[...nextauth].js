import clientPromise from "@/lib/mongodb"
import dbConnect from "@/lib/mongoose"
import Admin from "@/models/AdminSchema"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const isAdminEmail = async (email) => {
  await dbConnect()
  const isAdmin = await Admin.findOne({ email })

  return !!isAdmin?._id
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: async ({ session, token, user }) => {
      const isAdmin = await isAdminEmail(session?.user?.email)
      if (isAdmin) {
        return session
      } else {
        return false
      }
    },
  },
}

export default NextAuth(authOptions)

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!(await isAdminEmail(session?.user?.email))) {
    res.status(401)
    res.end()
    throw new Error("Not Authorized!")
  }
}

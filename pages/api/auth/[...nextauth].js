import clientPromise from "@/lib/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const adminEmails = ["pariwesh071@gmail.com"]

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
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

  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401)
    res.end()
    throw new Error("Not Authorized!")
  }
}

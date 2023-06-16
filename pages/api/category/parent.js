import dbConnect from "@/lib/mongoose"
import Category from "@/models/CategorySchema"
import { isAdminRequest } from "../auth/[...nextauth]"

const getParentCats = async (req, res) => {
  try {
    const parentCategories = await Category.find({ parent: { $exists: false } })

    res.json(parentCategories)
  } catch (error) {
    res.send(error)
  }
}

async function handler(req, res) {
  const { method } = req
  await dbConnect()
  await isAdminRequest(req, res)

  switch (method) {
    case "GET":
      await getParentCats(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler

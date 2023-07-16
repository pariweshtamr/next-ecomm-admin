import dbConnect from "@/lib/mongoose"
import { isAdminRequest } from "../auth/[...nextauth]"
import Order from "@/models/OrderSchema"

const getAllOrds = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createAt: -1 })
    res.json(orders)
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
      await getAllOrds(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler

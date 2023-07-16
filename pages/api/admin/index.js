import dbConnect from "@/lib/mongoose"
import { isAdminRequest } from "../auth/[...nextauth]"
import Admin from "@/models/AdminSchema"

const addAdmin = async (req, res) => {
  const { email } = req.body
  try {
    const adminExists = await Admin.findOne({ email })
    if (adminExists?._id) {
      return res.json({
        status: "error",
        message: "This email address has already been added!",
      })
    }
    const admin = await Admin.create({ email })

    if (admin?._id) {
      return res.json({
        status: "success",
        message: "Admin added successfully!",
        admin,
      })
    }

    res.json({ status: "error", message: "Unable to add admin!" })
  } catch (error) {
    res.send(error.message)
  }
}

const fetchAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({})

    res.json(admins)
  } catch (error) {
    res.send(error.message)
  }
}

const deleteAnAdmin = async (req, res) => {
  const { id } = req.query
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id)

    if (deletedAdmin?._id) {
      return res.json({
        status: "success",
        message: "Admin deleted successfully!",
      })
    }
    res.json({ status: "error", message: "Unable to delete admin!" })
  } catch (error) {
    res.send(error.message)
  }
}

async function handler(req, res) {
  const { method } = req
  await dbConnect()
  await isAdminRequest(req, res)

  switch (method) {
    case "POST":
      await addAdmin(req, res)
      break
    case "GET":
      await fetchAllAdmins(req, res)
      break
    case "DELETE":
      await deleteAnAdmin(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler

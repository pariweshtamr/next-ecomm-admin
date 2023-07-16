import dbConnect from "@/lib/mongoose"
import { isAdminRequest } from "../auth/[...nextauth]"
import Setting from "@/models/SettingSchema"

const selectFeaturedProduct = async (req, res) => {
  const { name, value } = req.body
  try {
    const settingDoc = await Setting.findOne({ name })
    if (settingDoc) {
      settingDoc.value = value
      await settingDoc.save()
      res.json(settingDoc)
    } else {
      res.json(await Setting.create({ name, value }))
    }
  } catch (error) {
    res.send(error.message)
  }
}

const getFeaturedProductSetting = async (req, res) => {
  const { name } = req.query
  try {
    const setting = await Setting.findOne({ name })

    if (setting?._id) {
      return res.json(setting)
    }
    res.json({ status: "error", message: "Unable to get setting!" })
  } catch (error) {
    res.send(error.message)
  }
}

export async function handler(req, res) {
  await dbConnect()
  await isAdminRequest(req, res)

  const { method } = req

  switch (method) {
    case "PUT":
      await selectFeaturedProduct(req, res)
      break
    case "GET":
      await getFeaturedProductSetting(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler

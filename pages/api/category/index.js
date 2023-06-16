import dbConnect from "@/lib/mongoose"
import Category from "@/models/CategorySchema"
import { isAdminRequest } from "../auth/[...nextauth]"

const addCat = async (req, res) => {
  const { parentCat, ...rest } = req.body
  try {
    const category = await Category.create({
      parent: parentCat || undefined,
      ...rest,
    })

    if (!category?._id) {
      res.json({ status: "error", message: "Unable to add category!" })
    }
    res.json({
      status: "success",
      message: "Category added successfully!",
      category,
    })
  } catch (error) {
    res.send(error)
  }
}

const getAllCats = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent")

    res.json(categories)
  } catch (error) {
    res.send(error)
  }
}

const updateCat = async (req, res) => {
  const { _id, ...rest } = req.body
  try {
    const updatedCategory = await Category.updateOne({ _id }, rest)

    if (!updatedCategory?.modifiedCount) {
      return res.json({
        status: "error",
        message: "Unable to update the category information!",
      })
    }
    res.json({
      status: "success",
      message: "Category information updated successfully!",
      updatedCategory,
    })
  } catch (error) {
    res.send(error)
  }
}

const deleteCat = async (req, res) => {
  const { id } = req.query
  try {
    if (id) {
      const deletedCategory = await Category.deleteOne({ _id: id })

      if (!deletedCategory?.deletedCount) {
        return res.status({
          status: "error",
          message: "Unable to delete category!",
        })
      }
      return res.json({
        status: "success",
        message: "Category deleted successfully!",
      })
    }
  } catch (error) {
    res.send(error)
  }
}

async function handler(req, res) {
  const { method } = req
  await dbConnect()
  await isAdminRequest(req, res)

  switch (method) {
    case "POST":
      await addCat(req, res)
      break

    case "GET":
      await getAllCats(req, res)
      break

    case "PUT":
      await updateCat(req, res)
      break

    case "DELETE":
      await deleteCat(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler

import dbConnect from "@/lib/mongoose"
import Product from "@/models/ProductSchema"

const addProd = async (req, res) => {
  try {
    const product = await Product.create(req.body)

    if (!product?._id) {
      res.json({ status: "error", message: "Unable to add product to db!" })
    }
    res.json({
      status: "success",
      message: "Product added successfully!",
      product,
    })
  } catch (error) {
    res.send(error)
  }
}

const getAllProds = async (req, res) => {
  const { id } = req.query
  try {
    const products = id ? await Product.findById(id) : await Product.find()

    res.json(products)
  } catch (error) {
    res.send(error)
  }
}

const updateProd = async (req, res) => {
  const { _id, ...rest } = req.body
  try {
    const updatedProduct = await Product.updateOne({ _id }, rest)

    if (!updatedProduct?.modifiedCount) {
      return res.json({
        status: "error",
        message: "Unable to update the product information!",
      })
    }

    res.json({
      status: "success",
      message: "Product information updated successfully!",
      updatedProduct,
    })
  } catch (error) {
    res.send(error)
  }
}

const deleteProd = async (req, res) => {
  const { id } = req.query
  try {
    const deleteProduct = await Product.deleteOne({ id })

    console.log(deleteProduct)
  } catch (error) {
    res.send(error)
  }
}

async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case "POST":
      await addProd(req, res)
      break

    case "GET":
      await getAllProds(req, res)
      break

    case "PUT":
      await updateProd(req, res)
      break

    case "DELETE":
      await deleteProd(req, res)
      break

    default:
      res.status(405).end(`Method ${req.method} is not allowed!`)
      break
  }
}

export default handler

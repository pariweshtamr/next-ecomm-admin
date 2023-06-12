import { useState } from "react"
import { useRouter } from "next/router"
import { addProduct, editProduct } from "@/lib/axiosHelper"

const initialState = {
  title: "",
  desc: "",
  price: "",
}

const ProductForm = ({ title, desc, price, _id }) => {
  const [form, setForm] = useState({ title, desc, price } || initialState)
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (_id) {
      // update product
      const { status, message, updatedProduct } = await editProduct({
        ...form,
        _id,
      })

      if (status === "success") {
        return router.push("/products")
      }
    } else {
      // add new product
      const { status, message, product } = await addProduct(form)

      if (status === "success") {
        return router.push("/products")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        name="title"
        onChange={handleChange}
        value={form?.title}
      />
      <label>Description</label>
      <textarea
        placeholder="Give description about the product..."
        rows="5"
        name="desc"
        onChange={handleChange}
        value={form?.desc}
      ></textarea>
      <label>Product Price (in AUD)</label>
      <input
        type="text"
        placeholder="$$$"
        name="price"
        onChange={handleChange}
        value={form?.price}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  )
}
export default ProductForm

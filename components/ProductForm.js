/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { addProduct, editProduct, getAllCategories } from "@/lib/axiosHelper"
import axios from "axios"
import Spinner from "./Spinner"
import { ReactSortable } from "react-sortablejs"

const initialState = {
  title: "",
  desc: "",
  price: "",
  category: "",
}

const ProductForm = ({
  title,
  desc,
  price,
  _id,
  images: existingImages,
  category,
  properties,
}) => {
  const [images, setImages] = useState(existingImages || [])
  const [form, setForm] = useState(
    { title, desc, price, category } || initialState
  )
  const [cats, setCats] = useState([])
  const [productProperties, setProductProperties] = useState(properties || {})
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()
  const cloudName = process.env.NEXT_PUBLIC_CLOUDNAME
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET

  const uploadImages = async (e) => {
    const { files } = e.target
    if (!files.length) return
    setIsUploading(true)
    const formData = new FormData()

    for (const file of files) {
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      setImages((oldImages) => {
        return [...oldImages, data.url]
      })
    }

    setIsUploading(false)
  }

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
        images,
        properties: productProperties,
      })

      if (status === "success") {
        return router.push("/products")
      }
    } else {
      // add new product
      const { status, message, product } = await addProduct({
        ...form,
        images,
        properties: productProperties,
      })

      if (status === "success") {
        return router.push("/products")
      }
    }
  }

  const updateImagesOrder = (images) => {
    setImages(images)
  }

  const setProductProp = (propName, value) => {
    setProductProperties((prev) => {
      const newProductProps = { ...prev }
      newProductProps[propName] = value
      return newProductProps
    })
  }

  // properties are only given to main parent category so to show properties for a particular product we need to get the parent category first
  const propertiesToFill = []
  if (cats?.length > 0 && category) {
    let catInfo = cats.find(({ _id }) => _id === category)
    propertiesToFill.push(...catInfo?.properties)

    while (catInfo?.parent?._id) {
      const parentCat = cats.find(({ _id }) => _id === catInfo.parent._id)
      propertiesToFill.push(...parentCat.properties)
      catInfo = parentCat
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories()
      setCats(categories)
    }
    fetchCategories()
  }, [])

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
      <label>Product category</label>
      <select name="category" onChange={handleChange} value={form.category}>
        <option value="">No category</option>
        {cats?.length > 0 &&
          cats.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>
      {propertiesToFill?.length > 0 &&
        propertiesToFill?.map((p) => (
          <div key={p._id} className="flex gap-2">
            <div>{p.name}</div>
            <select
              onChange={(e) => setProductProp(p.name, e.target.value)}
              value={productProperties[p?.name]}
            >
              {p.values.map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-2"
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-24 inline-block">
                <img src={link} alt="prod-img" className="rounded-md" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="w-24 h-24 flex items-center justify-center">
            <Spinner />
          </div>
        )}

        <label className="w-24 h-24 flex items-center justify-center text-sm gap-1 text-gray-500 rounded-md bg-gray-200 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
          <input
            type="file"
            className="hidden"
            multiple
            onChange={uploadImages}
          />
        </label>
      </div>

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
      <button type="submit" className="btn-success">
        Save
      </button>
    </form>
  )
}
export default ProductForm

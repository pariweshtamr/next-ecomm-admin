import Layout from "@/components/Layout"
import {
  addCategory,
  deleteCat,
  editCat,
  getAllCategories,
} from "@/lib/axiosHelper"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const Categories = () => {
  const [name, setName] = useState("")
  const [parentCat, setParentCat] = useState("")
  const [editedCategory, setEditedCategory] = useState(null)
  const [cats, setCats] = useState([])
  const [properties, setProperties] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editedCategory) {
      if (!parentCat) {
        const { status, message } = await addCategory({ name })
      } else {
        const { status, message } = await addCategory({
          name,
          parent: parentCat,
        })
      }
    } else {
      const { status, message } = await editCat({
        name,
        parent: parentCat,
        _id: editedCategory._id,
      })
    }

    setName("")
    setParentCat("")
    fetchCategories()
  }

  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name)
    if (category?.parent?._id) {
      setParentCat(category.parent?._id)
    } else {
      setParentCat("")
    }
  }

  const deleteCategory = (category) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the category "${category.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { status, message } = await deleteCat(category._id)

        if (status === "success") {
          Swal.fire("Deleted!", message, "success")
        }
        fetchCategories()
      }
    })
  }

  const fetchCategories = async () => {
    const categories = await getAllCategories()
    setCats(categories)
  }

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }]
    })
  }

  const handlePropertyNameChange = (i, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev]
      properties[i].name = newName
      return properties
    })
  }

  const handlePropertyValuesChange = (i, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev]
      properties[i].values = newValues
      return properties
    })
  }

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => indexToRemove !== pIndex)
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category "${editedCategory.name}"`
          : "Create new category"}
      </label>
      <form onSubmit={handleSubmit} className="mt-1">
        <div className="flex gap-2">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Category name"
            value={name}
          />
          <select
            value={parentCat}
            onChange={(e) => setParentCat(e.target.value)}
          >
            <option>No parent category</option>
            {cats?.length > 0 &&
              cats.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="btn-default mt-1"
          >
            Add new peoperty
          </button>

          {properties?.length > 0 &&
            properties.map((property, i) => (
              <div className="flex gap-2 mt-2" key={i}>
                <button onClick={() => removeProperty(i)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  className="mb-0"
                  type="text"
                  placeholder="property name (example: color)"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyNameChange(i, property, e.target.value)
                  }
                />
                <input
                  className="mb-0"
                  type="text"
                  placeholder="values"
                  value={property.values}
                  onChange={(e) =>
                    handlePropertyValuesChange(i, property, e.target.value)
                  }
                />
              </div>
            ))}
        </div>

        <button type="submit" className="btn-success py-1">
          Save
        </button>
      </form>

      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Parent category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {cats?.length > 0 &&
            cats.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex gap-1.5">
                  <button
                    className="btn-secondary flex items-center gap-1.5"
                    onClick={() => editCategory(category)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary flex items-center gap-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  )
}
export default Categories

import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner"
import { deleteProd, getAllProducts } from "@/lib/axiosHelper"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const Products = () => {
  const [prods, setProds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const deleteProduct = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the product "${product.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { status, message } = await deleteProd(product._id)

        if (status === "success") {
          Swal.fire("Deleted!", message, "success")
        }
        fetchProducts()
      }
    })
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    const products = await getAllProducts()
    setProds(products)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Layout className="md:mb-4">
      <Link
        href="/products/new"
        className="bg-textColor text-white py-2.5 px-4 rounded-md"
      >
        Add new product
      </Link>
      <table className="basic mt-6 md:w-1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={5}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {!!prods?.length &&
            prods?.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product?.category?.name}</td>
                <td>${product.price}</td>
                <td className="flex gap-2">
                  <Link
                    href={`/products/edit/${product._id}`}
                    className="flex items-center gap-1"
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
                  </Link>

                  <button
                    className="flex items-center gap-1 btn-primary"
                    onClick={() => deleteProduct(product)}
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
export default Products

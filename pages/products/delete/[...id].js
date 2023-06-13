import Layout from "@/components/Layout"
import { deleteProd, getSingleProduct } from "@/lib/axiosHelper"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DeleteProductPage = () => {
  const router = useRouter()
  const { query } = router
  const { id } = query
  const [productInfo, setProductInfo] = useState(null)

  const delProduct = async () => {
    const { status, message } = await deleteProd(id)

    if (status === "success") {
      return router.push("/products")
    }
  }

  useEffect(() => {
    if (!id) return
    const fetchSingleProduct = async () => {
      const product = await getSingleProduct(id)
      setProductInfo(product)
    }
    fetchSingleProduct()
  }, [id])
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete product &quot;{productInfo?.title}&quot;?
      </h1>

      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={delProduct}>
          Yes
        </button>
        <button
          className="btn-default"
          onClick={() => router.push("/products")}
        >
          No
        </button>
      </div>
    </Layout>
  )
}
export default DeleteProductPage

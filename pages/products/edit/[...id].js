import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"
import { getSingleProduct } from "@/lib/axiosHelper"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const EditProductPage = () => {
  const { query } = useRouter()
  const { id } = query
  const [productInfo, setProductInfo] = useState(null)

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const product = await getSingleProduct(id)
      setProductInfo(product)
    }
    fetchSingleProduct()
  }, [id])

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  )
}
export default EditProductPage

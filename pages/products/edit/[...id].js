import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"
import Spinner from "@/components/Spinner"
import { getSingleProduct } from "@/lib/axiosHelper"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const EditProductPage = () => {
  const { query } = useRouter()
  const { id } = query
  const [productInfo, setProductInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSingleProduct = async () => {
      setIsLoading(true)
      const product = await getSingleProduct(id)
      setProductInfo(product)
      setIsLoading(false)
    }
    fetchSingleProduct()
  }, [id])

  return (
    <Layout>
      <h1>Edit Product</h1>
      {isLoading && (
        <div className="py-4">
          <Spinner />
        </div>
      )}
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  )
}
export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {},
  }
}
export default EditProductPage

import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect } from "react"

const DeleteProductPage = () => {
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
  }, [id])
  return (
    <Layout>
      <h1>Do you really want to delete product X?</h1>
      <button>Yes</button>
      <button onClick={() => router.push("/products")}>No</button>
    </Layout>
  )
}
export default DeleteProductPage

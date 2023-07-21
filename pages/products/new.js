import Layout from "@/components/Layout"
import ProductForm from "@/components/ProductForm"
import { getSession } from "next-auth/react"

const NewProduct = () => {
  return (
    <Layout>
      <h1>New Product</h1>
      <ProductForm />
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
export default NewProduct

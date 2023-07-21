import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner"
import {
  getAllProducts,
  getSavedSetting,
  saveSettings,
} from "@/lib/axiosHelper"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const Settings = () => {
  const [products, setProducts] = useState([])
  const [featuredProductId, setFeaturedProductId] = useState(null)
  const [shippingFee, setShippingFee] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const saveSett = async () => {
    setIsLoading(true)
    const featuredProdSetting = await saveSettings({
      name: "featuredProductId",
      value: featuredProductId,
    })

    const shippingFeeSetting = await saveSettings({
      name: "shippingFee",
      value: shippingFee,
    })

    if (featuredProdSetting?._id && shippingFeeSetting?._id) {
      Swal.fire({
        title: "Success!",
        text: "Settings saved!",
        icon: "success",
      })

      setIsLoading(false)
    } else {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      })

      setIsLoading(false)
    }
  }

  const fetchAll = () => {
    setIsLoading(true)
    const fetchAllProducts = async () => {
      const prods = await getAllProducts()
      setProducts(prods)
    }

    const fetchFeaturedProdSetting = async () => {
      const setting = await getSavedSetting("featuredProductId")
      if (setting?._id) {
        setFeaturedProductId(setting.value)
      }
    }
    const fetchShippingFeeSetting = async () => {
      const setting = await getSavedSetting("shippingFee")
      if (setting?._id) {
        setShippingFee(setting.value)
      }
    }

    fetchAllProducts()
    fetchFeaturedProdSetting()
    fetchShippingFeeSetting()
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <Layout>
      <h1>Settings</h1>
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          <label htmlFor="">Featured Product</label>
          <select
            onChange={(e) => setFeaturedProductId(e.target.value)}
            value={featuredProductId}
          >
            <option value="">-- Select Product --</option>
            {products?.length > 0 &&
              products.map((prod) => (
                <option key={prod._id} value={prod._id}>
                  {prod.title}
                </option>
              ))}
          </select>
          <label htmlFor="">Shipping fee (in AUD)</label>
          <input
            type="number"
            value={shippingFee}
            onChange={(e) => setShippingFee(e.target.value)}
          />
          <div>
            <button type="button" className="btn-success" onClick={saveSett}>
              Save settings
            </button>
          </div>
        </>
      )}
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
export default Settings

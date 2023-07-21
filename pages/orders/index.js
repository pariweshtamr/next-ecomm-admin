import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner"
import { getAllOrders } from "@/lib/axiosHelper"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"

const Orders = () => {
  const [ords, setOrds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      const orders = await getAllOrders()
      setOrds(orders)
      setIsLoading(false)
    }
    fetchOrders()
  }, [])

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Status</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Amount</th>
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

          {!!ords?.length > 0 &&
            ords.map((ord) => (
              <tr
                className={ord.paid ? "bg-success" : "bg-primary"}
                key={ord?._id}
              >
                <td>{ord.paid ? "Paid" : "Unpaid"}</td>
                <td>{new Date(ord.createdAt).toLocaleString("en-Au")}</td>
                <td>
                  {ord.fName} {ord.lName} <br />
                  {ord.email} <br />
                  {ord.street}, {ord.city}, {ord.postalCode} <br />
                  {ord.country}
                </td>
                <td>
                  {ord.line_items.map((l, i) => (
                    <div key={i}>
                      {l?.price_data?.product_data?.name} X {l?.quantity}
                    </div>
                  ))}
                </td>
                <td>${ord.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
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
export default Orders

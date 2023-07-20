import { getAllOrders } from "@/lib/axiosHelper"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { subHours } from "date-fns"

const Stats = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchOrders = async () => {
    setIsLoading(true)
    const ords = await getAllOrders()
    setOrders(ords)
    setIsLoading(false)
  }
  useEffect(() => {
    fetchOrders()
  }, [])

  const ordersToday = orders?.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24)
  )

  const ordersWeek = orders?.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
  )

  const ordersMonth = orders?.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
  )

  const ordersTotal = (orders) => {
    let sum = 0
    orders.forEach((order) => {
      const { line_items } = order

      line_items.forEach((i) => {
        const lineSum = i.quantity * (i.price_data.unit_amount / 100)
        sum += lineSum
      })
    })
    return new Intl.NumberFormat("en-AU").format(sum)
  }

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner fullWidth={true} />
      </div>
    )
  }

  return (
    <div className="">
      <h2>Orders</h2>
      <div className="tiles_grid">
        <div className="tile">
          <h3 className="tile_header">Today</h3>
          <div className="tile_number">{ordersToday.length}</div>
          <div className="tile_desc">
            {ordersToday.length === 1
              ? `${ordersToday.length} order today`
              : `${ordersToday.length} orders today`}
          </div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This week</h3>
          <div className="tile_number">{ordersWeek.length}</div>
          <div className="tile_desc">
            {" "}
            {ordersWeek.length === 1
              ? `${ordersWeek.length} order this week`
              : `${ordersWeek.length} orders this week`}
          </div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This month</h3>
          <div className="tile_number">{ordersMonth.length}</div>
          <div className="tile_desc">
            {ordersMonth.length === 1
              ? `${ordersMonth.length} order this month`
              : `${ordersMonth.length} orders this month`}
          </div>
        </div>
      </div>

      <h2>Revenue</h2>
      <div className="tiles_grid">
        <div className="tile">
          <h3 className="tile_header">Today</h3>
          <div className="tile_rev">$ {ordersTotal(ordersToday)}</div>
          <div className="tile_desc">
            {ordersToday.length === 1
              ? `${ordersToday.length} order today`
              : `${ordersToday.length} orders today`}
          </div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This week</h3>
          <div className="tile_rev">$ {ordersTotal(ordersWeek)}</div>
          <div className="tile_desc">
            {" "}
            {ordersWeek.length === 1
              ? `${ordersWeek.length} order this week`
              : `${ordersWeek.length} orders this week`}
          </div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This month</h3>
          <div className="tile_rev">$ {ordersTotal(ordersMonth)}</div>
          <div className="tile_desc">
            {ordersMonth.length === 1
              ? `${ordersMonth.length} order this month`
              : `${ordersMonth.length} orders this month`}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Stats

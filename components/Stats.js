const Stats = () => {
  return (
    <div className="">
      <h2>Orders</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="tile">
          <h3 className="tile_header">Today</h3>
          <div className="tile_number">2</div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This week</h3>
          <div className="tile_number">2</div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This month</h3>
          <div className="tile_number">2</div>
        </div>
      </div>

      <h2>Revenue</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="tile">
          <h3 className="tile_header">Today</h3>
          <div className="tile_number">$200</div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This week</h3>
          <div className="tile_number">$1200</div>
        </div>
        <div className="tile">
          <h3 className="tile_header">This month</h3>
          <div className="tile_number">$5000</div>
        </div>
      </div>
    </div>
  )
}
export default Stats

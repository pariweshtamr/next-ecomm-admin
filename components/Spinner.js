import { PulseLoader } from "react-spinners"

const Spinner = ({ fullWidth }) => {
  if (fullWidth) {
    return (
      <div className="w-full flex justify-center">
        <PulseLoader color="#000" />
      </div>
    )
  }
  return <PulseLoader color="#000" />
}
export default Spinner

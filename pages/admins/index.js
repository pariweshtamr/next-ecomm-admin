import Layout from "@/components/Layout"
import Spinner from "@/components/Spinner"
import { addAdminEmail, delAdmin, getAllAdmins } from "@/lib/axiosHelper"
import DateFormat from "@/lib/dateFormat"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const AdminsPage = () => {
  const [email, setEmail] = useState("")
  const [adminEmails, setAdminEmails] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchAdmins = async () => {
    setIsLoading(true)
    const admins = await getAllAdmins()
    setAdminEmails(admins)
    setIsLoading(false)
  }

  const addAdmin = async (e) => {
    e.preventDefault()
    const { status, message } = await addAdminEmail({ email })
    if (status === "success") {
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
      })
      fetchAdmins()
      setEmail("")
    } else {
      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
      })
    }
  }

  const deleteAdmin = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (!result.isConfirmed) return
      const { status, message } = await delAdmin(_id)
      if (status === "success") {
        Swal.fire({
          title: "Success!",
          text: message,
          icon: "success",
        })
        fetchAdmins()
      } else {
        Swal.fire({
          title: "Error!",
          text: message,
          icon: "error",
        })
      }
    })
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  return (
    <Layout>
      <h1>Admins</h1>

      <h2>Add new admin</h2>
      <form onSubmit={addAdmin}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Google email"
            className="mb-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-success whitespace-nowrap" type="submit">
            Add admin
          </button>
        </div>
      </form>

      <h2>Existing Admins</h2>
      <table className="basic">
        <thead>
          <tr>
            <th>Admin google email</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}

          {!!adminEmails?.length &&
            adminEmails.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.email}</td>
                <td>{admin.createdAt && DateFormat(admin.createdAt)}</td>
                <td>
                  <button
                    onClick={() => deleteAdmin(admin._id)}
                    className="btn-primary flex items-center gap-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  )
}
export default AdminsPage

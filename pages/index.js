import Layout from "@/components/Layout"
import Stats from "@/components/Stats"
import { getParentCategories } from "@/lib/axiosHelper"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

const Home = () => {
  const { data: session } = useSession()
  const [parentCats, setParentCats] = useState([])
  const today = new Date()
  const currentHr = today.getHours()

  const fetchParentCategories = async () => {
    const parentCategories = await getParentCategories()
    setParentCats(parentCategories)
  }

  useEffect(() => {
    fetchParentCategories()
  }, [])

  return (
    <Layout>
      <div className="text-[#161313] flex justify-between gap-8 lg:flex-col">
        <div className="flex flex-col w-1/2 gap-3 lg:w-full lg:text-center">
          {currentHr < 12 ? (
            <p className="flex flex-col text-6xl gap-2">
              Good Morning,
              <span>
                {session?.user?.name.split(" ").splice(0, 1).join(" ")}
              </span>
            </p>
          ) : currentHr < 18 ? (
            <p className="flex flex-col text-6xl gap-2 font-[500]">
              Good Afternoon,
              <span>
                {session?.user?.name.split(" ").splice(0, 1).join(" ")}
              </span>
            </p>
          ) : (
            <h1 className="flex flex-col text-6xl gap-2">
              Good Evening,
              <span>
                {session?.user?.name.split(" ").splice(0, 1).join(" ")}
              </span>
            </h1>
          )}

          <p className="text-gray-500 pr-20 lg:px-5">
            This admin panel is a tool that helps organize and apply CRUD
            operations to products and categories of an online E-Commerce
            platform.
          </p>
        </div>

        <div className="flex flex-col w-1/2 lg:w-full">
          <div className="h-max w-max flex items-center self-end bg-[#f2f2f2] text-black rounded-full lg:hidden">
            <Image
              src={session?.user?.image}
              alt="profile-img"
              width={35}
              height={35}
              className="rounded-full"
            />
            <span className="px-4">{session?.user?.name}</span>
          </div>

          <div>
            <h2 className="mb-3 font-bold text-2xl">Categories</h2>

            <div className="flex justify-between lg:grid xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-2 md:place-items-center">
              {!!parentCats?.length &&
                parentCats?.map((cat) => (
                  <div
                    key={cat._id}
                    className="bg-[#f2f2f2] flex flex-col gap-2.5 items-center justify-center w-[6.5rem] h-[6.5rem] rounded-md"
                  >
                    {cat?.name.toLowerCase().includes("smartphones") && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            fill="#95a5a6"
                            d="M7 1030.4c-.552 0-1 .4-1 1v19c0 .5.448 1 1 1h10c.552 0 1-.5 1-1v-19c0-.6-.448-1-1-1H7z"
                          ></path>
                          <path
                            fill="#bdc3c7"
                            d="M7 1029.4c-.552 0-1 .4-1 1v19c0 .5.448 1 1 1h10c.552 0 1-.5 1-1v-19c0-.6-.448-1-1-1H7z"
                          ></path>
                          <path
                            fill="#95a5a6"
                            d="M13 1048.9a1 1 0 11-2 0 1 1 0 112 0z"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M7 1032.4H17V1047.4H7z"
                          ></path>
                          <path
                            fill="#34495e"
                            d="M7 1031.4v12l10-8.3v-3.7H7z"
                          ></path>
                          <path
                            fill="#95a5a6"
                            d="M9 1029.4H15V1030.4H9z"
                          ></path>
                        </g>
                      </svg>
                    )}
                    {cat?.name.toLowerCase().includes("laptops") && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            fill="#95a5a6"
                            d="M0 1047.4H24V1048.4H0z"
                          ></path>
                          <path
                            fill="#7f8c8d"
                            d="M4 1033.4c-.552 0-1 .4-1 1v12h18v-12c0-.6-.448-1-1-1H4z"
                          ></path>
                          <path
                            fill="#bdc3c7"
                            d="M3 1046.4l-3 1h24l-3-1H3z"
                          ></path>
                          <path
                            fill="#7f8c8d"
                            d="M10 1047.4H14V1048.4H10z"
                          ></path>
                          <path
                            fill="#34495e"
                            d="M4 1034.4H20V1045.4H4z"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M20 1036.8l-14.812 8.6H20v-8.6z"
                          ></path>
                        </g>
                      </svg>
                    )}
                    {cat?.name.toLowerCase().includes("headphones") && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            fill="#f39c12"
                            d="M18 1040.4c.552 0 1 .4 1 1v8c0 .5-.448 1-1 1h-1v-10h1z"
                          ></path>
                          <path
                            fill="#e67e22"
                            d="M18 1050.4c.552 0 1-.5 1-1v-4h-2v5h1z"
                          ></path>
                          <path
                            fill="#f39c12"
                            d="M6 1040.4c-.552 0-1 .4-1 1v8c0 .5.448 1 1 1h1v-10H6z"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M2 1036.4v2.1c-.586.2-1 .7-1 1.4 0 .8.672 1.5 1.5 1.5h.063L5 1045.6v-2.7l-1.25-2.2c.162-.2.25-.5.25-.8 0-.7-.414-1.2-1-1.4v-2.1H2z"
                          ></path>
                          <path
                            fill="#34495e"
                            d="M7 1039.4v12h1.5c.828 0 1.5-.7 1.5-1.5v-9c0-.9-.672-1.5-1.5-1.5H7z"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M7 1051.4v-6h3v4.5c0 .8-.672 1.5-1.5 1.5H7z"
                          ></path>
                          <path fill="#f1c40f" d="M6 1039.4H8V1051.4H6z"></path>
                          <path
                            fill="#34495e"
                            d="M11 1028.4c-3.939-.1-7.792 2.9-9.625 7.4-.365 1.5 1.493 2.2 1.906.8 1.566-3.5 4.63-5.7 7.719-5.7h2c3.089 0 6.153 2.2 7.719 5.7.413 1.4 2.271.7 1.906-.8-1.833-4.5-5.686-7.5-9.625-7.4h-2zM17 1039.4v12h-1.5c-.828 0-1.5-.7-1.5-1.5v-9c0-.9.672-1.5 1.5-1.5H17z"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M17 1051.4v-6h-3v4.5c0 .8.672 1.5 1.5 1.5H17z"
                          ></path>
                          <path
                            fill="#f1c40f"
                            d="M-18 1039.4H-16V1051.4H-18z"
                            transform="scale(-1 1)"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M11 1029.9c-3.804 0-7.505 2.8-9.406 7 .458.6 1.403.6 1.687-.4 1.566-3.4 4.63-5.6 7.719-5.6h2c3.089 0 6.153 2.2 7.719 5.6.284 1 1.229 1 1.687.4-1.901-4.2-5.602-7-9.406-7h-2z"
                          ></path>
                          <path
                            fill="#e67e22"
                            d="M6 1050.4c-.552 0-1-.5-1-1v-4h2v5H6z"
                          ></path>
                          <path fill="#f39c12" d="M6 1045.4H8V1051.4H6z"></path>
                          <path
                            fill="#f39c12"
                            d="M16 1045.4H18V1051.4H16z"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M22 1036.4v2.1c.586.2 1 .7 1 1.4 0 .8-.672 1.5-1.5 1.5h-.062L19 1045.6v-2.7l1.25-2.2c-.162-.2-.25-.5-.25-.8 0-.7.414-1.2 1-1.4v-2.1h1z"
                          ></path>
                          <path
                            fill="#7f8c8d"
                            d="M3 1039.9a.5.5 0 11-1 0 .5.5 0 111 0zM22 1039.9a.5.5 0 11-1 0 .5.5 0 111 0z"
                          ></path>
                        </g>
                      </svg>
                    )}
                    {cat?.name.toLowerCase().includes("tablets") && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <g transform="translate(0 -1028.4)">
                          <path
                            fill="#95a5a6"
                            d="M2 1033.4c-.552 0-1 .4-1 1v14c0 .5.448 1 1 1h20c.552 0 1-.5 1-1v-14c0-.6-.448-1-1-1H2z"
                          ></path>
                          <path
                            fill="#bdc3c7"
                            d="M2 1032.4c-.552 0-1 .4-1 1v14c0 .5.448 1 1 1h20c.552 0 1-.5 1-1v-14c0-.6-.448-1-1-1H2z"
                          ></path>
                          <path
                            fill="#2c3e50"
                            d="M3 1034.4H21V1046.4H3z"
                          ></path>
                          <path
                            fill="#34495e"
                            d="M3 1034.4v10l18-6.9v-3.1H3z"
                          ></path>
                          <path
                            fill="#95a5a6"
                            d="M23 1040.402a1 1 0 11-2 0 1 1 0 112 0z"
                          ></path>
                          <path
                            fill="#7f8c8d"
                            d="M2.5 1040.4a.5.5 0 11-1 0 .5.5 0 111 0zM22 1039.4c-.552 0-1 .4-1 1h2c0-.6-.448-1-1-1z"
                          ></path>
                          <path
                            fill="#bdc3c7"
                            d="M22.5 1040.4a.5.5 0 11-1 0 .5.5 0 111 0z"
                          ></path>
                        </g>
                      </svg>
                    )}
                    {cat?.name.toLowerCase().includes("consoles") && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        enableBackground="new 0 0 58 58"
                        version="1.1"
                        viewBox="0 0 58 58"
                        xmlSpace="preserve"
                        className="w-6 h-6"
                      >
                        <path
                          fill="#38454F"
                          d="M58 51.034L0 51.034 1 44.034 57 44.034z"
                        ></path>
                        <path
                          fill="#283238"
                          d="M5 40.034L53 40.034 57 44.034 1 44.034z"
                        ></path>
                        <path
                          fill="#546A79"
                          d="M16 44.034H18V51.034H16z"
                        ></path>
                        <g fill="#283238">
                          <path d="M48 29.034h-8.273c.476 1.338 1.045 2.922 1.045 2.922.185.344.305.708.365 1.078H57l-9-4zM32.57 32.888c-1.506-1.728-1.186-1.025-3.038-2.375-.377-.275-.973-.847-1.545-1.479H10l-9 4h31.697l-.127-.146z"></path>
                        </g>
                        <path
                          fill="#38454F"
                          d="M57 33.034H41.137a3.443 3.443 0 01-.962 2.991 3.446 3.446 0 01-4.872 0l-2.606-2.991H1l-1 7h58l-1-7z"
                        ></path>
                        <path
                          fill="#283238"
                          d="M45 38.034a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM48 38.034a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zM51 38.034a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1z"
                        ></path>
                        <path
                          fill="#38454F"
                          d="M22.414 29.034h-2.828l-3.293 3.293a.996.996 0 00-.293.707h2.414l4-4z"
                        ></path>
                        <path
                          fill="#546A79"
                          d="M16 33.034L16 40.034 18 40.034 18 33.448 18.414 33.034z"
                        ></path>
                        <path
                          fill="#546A79"
                          d="M46.082 7.485c-2.254-1.056-4.928-.444-6.664 1.34-.291.299-.563.724-.801 1.177a22.053 22.053 0 01-3.917 5.321c-1.555 1.555-3.345 2.846-5.28 3.89a7.073 7.073 0 00-1.56 1.17c-1.786 1.737-2.4 4.415-1.341 6.671.481 1.025 2.225 2.887 3.012 3.46 1.852 1.35 1.532.647 3.038 2.375l2.733 3.137a3.445 3.445 0 005.469-4.069s-1.72-4.787-1.68-4.747l7.177-7.177 4.72 1.707a3.446 3.446 0 004.069-5.469l-3.136-2.733c-1.728-1.506-1.026-1.186-2.376-3.038-.573-.789-2.437-2.534-3.463-3.015z"
                        ></path>
                        <circle
                          cx="44.162"
                          cy="13.652"
                          r="3"
                          fill="#38454F"
                        ></circle>
                        <circle
                          cx="32.765"
                          cy="25.05"
                          r="3"
                          fill="#38454F"
                        ></circle>
                        <path
                          fill="#38454F"
                          d="M36.384 21.016a.999.999 0 01-.707-1.707l2.829-2.828a.999.999 0 111.414 1.414l-2.829 2.828a.993.993 0 01-.707.293z"
                        ></path>
                        <path
                          fill="#38454F"
                          d="M36.384 21.016a.997.997 0 01-.707-.293l-.707-.707a.999.999 0 111.414-1.414l.707.707a.999.999 0 01-.707 1.707zM39.213 18.188a.997.997 0 01-.707-.293l-.707-.707a.999.999 0 111.414-1.414l.707.707a.999.999 0 01-.707 1.707z"
                        ></path>
                      </svg>
                    )}

                    <p className="text-xs">{cat?.name}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <Stats />
      </div>
    </Layout>
  )
}

export default Home

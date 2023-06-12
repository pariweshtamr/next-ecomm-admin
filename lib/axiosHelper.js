import axios from "axios"

const apiRootUrl = "/api"
const productEp = apiRootUrl + "/product"

export const axiosProcessor = async ({ url, method, objData }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: objData,
    })

    return data
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// add new product
export const addProduct = async (objData) => {
  try {
    const obj = {
      method: "POST",
      url: productEp,
      objData,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get all products
export const getAllProducts = async () => {
  try {
    const obj = {
      method: "GET",
      url: productEp,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get single product
export const getSingleProduct = async (id) => {
  try {
    const obj = {
      method: "GET",
      url: productEp + `?id=${id}`,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const editProduct = async (objData) => {
  try {
    const obj = {
      method: "PUT",
      url: productEp,
      objData,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

export const deleteProduct = async (id) => {
  try {
    const obj = {
      method: "DELETE",
      url: productEp + `?id=${id}`,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

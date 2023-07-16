import axios from "axios"

const apiRootUrl = "/api"
const productEp = apiRootUrl + "/product"
const categoryEp = apiRootUrl + "/category"
const orderEp = apiRootUrl + "/order"
const adminEp = apiRootUrl + "/admin"

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

// update product info
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

// delete a product
export const deleteProd = async (id) => {
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

// add category
export const addCategory = async (objData) => {
  try {
    const obj = {
      method: "POST",
      url: categoryEp,
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

// get all categories
export const getAllCategories = async () => {
  try {
    const obj = {
      method: "GET",
      url: categoryEp,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get parent categories
export const getParentCategories = async () => {
  try {
    const obj = {
      method: "GET",
      url: categoryEp + "/parent",
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// update category info
export const editCat = async (objData) => {
  try {
    const obj = {
      method: "PUT",
      url: categoryEp,
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

export const deleteCat = async (id) => {
  try {
    const obj = {
      method: "DELETE",
      url: categoryEp + `?id=${id}`,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// get all orders
export const getAllOrders = async () => {
  try {
    const obj = {
      method: "GET",
      url: orderEp,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// add admin email to db
export const addAdminEmail = async (objData) => {
  try {
    const obj = {
      method: "POST",
      url: adminEp,
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

// get all admins
export const getAllAdmins = async () => {
  try {
    const obj = {
      method: "GET",
      url: adminEp,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

// delete admin
export const delAdmin = async (_id) => {
  try {
    const obj = {
      method: "DELETE",
      url: adminEp + `?id=${_id}`,
    }
    return await axiosProcessor(obj)
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    }
  }
}

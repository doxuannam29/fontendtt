import axios from "axios"
export const axiosJWT = axios.create()


export const getAllProduct = async () => {
    // let res = {}
    // if (search?.length > 0) {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getallproduct?filter=name&filter=${search}&limit=${limit}`)
    // } else {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getallproduct`)

    return res.data
}


export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/createpro`, data)
    return res.data
}
export const getProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getproduct/${id}`)

    return res.data
}
export const getProductEmail = async (email) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getproductuer/${email}`)

    return res.data
}
export const udateProduct = async (id, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data)
    return res.data
}
export const deleteProduct = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/deleteproduct/${id}`)
    return res.data
}
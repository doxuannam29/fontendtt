import axios from "axios"
export const axiosJWT = axios.create()



export const getAllProductsByUser = async () => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/productuser/getallproductuser`)

    return res.data
}

export const createProductUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/productuser/createuser`, data)
    return res.data

}


export const getProductUer = async (email) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/productuser/getproductuser/${email}`)

    return res.data
}
export const getProductUerid = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/productuser/getproductuserpro/${id}`)

    return res.data
}
export const udateProduct = async (id, data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/productuser/update/${id}`, data)
    return res.data
}
export const deleteProductUser = async (id) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/productuser/deleteproductuser/${id}`)
    return res.data
}
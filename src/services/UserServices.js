import axios from 'axios'
export const axiosJWT = axios.create()
export const loginUser = async (data) => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sing-in`, data)
    return res.data
}
export const singIn = async (data) => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sing-up`, data)
    return res.data
}
export const getId = async (id, access_token) => {

    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-user/${id}`, {
        Headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const deleteUser = async (id, access_token, data) => {

    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getAlluser = async (access_token) => {

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/getall-user`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const refrefreshToken = async () => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh_token`, {}, {
        headers: {
            token: `Bearer ${refrefreshToken}`,
        }
    })


    return res.data
}
export const logoutUser = async () => {

    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/logout`)
    return res.data
}
export const upDate = async (id, data) => {

    const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data)
    return res.data
}
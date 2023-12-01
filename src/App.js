import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponents from './components/DefaultComponents/DefaultComponents'
import axios from 'axios'
import { useQueries } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './util'
import *as UserServices from './services/UserServices'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slider/UserSlide'



function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const { storageData, decoded } = headDecod()

    if (decoded?.id) {
      headlDetaiUser(decoded?.id, storageData)
    }


  }, [])

  const headDecod = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData);

    }
    return { decoded, storageData }
  }

  UserServices.axiosJWT.interceptors.request.use(async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const { decoded } = headDecod()
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserServices.refrefreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }

    return config;
  }, (err) => {
    // Do something with request error
    return Promise.reject(err);
  });
  const headlDetaiUser = async (id, token) => {
    const res = await UserServices.getId(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
    // console.log('res', res)
  }

  // useEffect(() => {
  //   fetchApi()

  // }, [])
  // const fetchApi = async () => {

  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getallproduct`)
  //   return res.data
  // }

  // const query = useQuery({ queryKey: ['todos'], queryFn: fetchApi })
  // console.log('query', query)


  return (
    <div>

      <Router>
        <Routes>
          {routes.map((routes) => {
            const Page = routes.page
            const ischeckAuth = !routes.isPrivate || user.isAdmin
            console.log("check", user.isAdmin)
            const Layout = routes.isShowHeader ? DefaultComponents : Fragment
            return (
              <Route key={routes.path} path={ischeckAuth ? routes.path : undefined} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>

    </div>

  )
}
export default App
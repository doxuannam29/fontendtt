import React, { useEffect, useState } from 'react'
import './Singup.scss'
import InputForm from '../../components/InputForm/InputForm'
import { Button, Image } from 'antd'
import imganhdn from '../../art_anh/image/imagesNha.jpg'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import *as UserServices from '../../services/UserServices'
import { UserHook } from '../../hooks/UserHook'
import *as message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slider/UserSlide'
const Singup = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    const mutation = UserHook(
        data => UserServices.loginUser(data)
    )
    const { data, isLoading, isSuccess, isError } = mutation
    console.log("mutay", mutation)

    useEffect(() => {
        if (isSuccess) {
            navigate('/type')
            message.success()
            console.log("datad", data)
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token);
                console.log("decode", decoded)
                if (decoded?.id) {
                    headlDetaiUser(decoded?.id, data?.access_token)
                }
            }
        }

    }, [isSuccess])

    const headlDetaiUser = async (id, token) => {
        const res = await UserServices.getId(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
        console.log('res', res)
    }

    const headlOnchangeEmail = (value) => {
        setEmail(value)
    }
    const headlOnchangepassword = (value) => {
        setPassword(value)
    }
    const headClicQ = () => {
        navigate('/singin')
    }
    const headlbutndn = () => {
        if (email.trim() !== "" && password.trim() !== "") {
            mutation.mutate({
                email,
                password
            })
            // navigate('/')


        }
        else {
            alert("ban can nhap dai du thong tin")
        }
    }
    return (
        <div className='FormDN'>
            <div className='Formdangnhap'>
                <div>
                    <div>
                        <h1>Xin Chao </h1>
                        <p>Dang nhap vao tao tai khoan</p>
                        <InputForm input placeholder='nam@gmail.com' value={email} headlOnchange={headlOnchangeEmail} />
                        <InputForm placeholder='password' headlOnchange={headlOnchangepassword} />
                    </div>
                    {data?.status === 'err email pass' && <span style={{ color: 'red' }}>{data?.message}</span>}

                    <Button

                        onClick={headlbutndn} className='ButtonDN'

                    >
                        Dang nhap
                    </Button>
                    <div>
                        <p>Quên Mật Khẩu?</p>
                        <p onClick={headClicQ}>Tạo Tài Khoản</p>

                        <p>________ Hoặc _________</p>
                        <p> <i class="fa-brands fa-facebook"></i><i class="fa-brands fa-google"></i></p>
                    </div>
                </div>
                <div className='anhDN'>
                    <Image src={imganhdn} preview={false} alt='imglogo' />
                    <h3>Thue Nha Tai DXN</h3>
                </div>

            </div>
        </div>
    )
}

export default Singup
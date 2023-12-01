import { Button, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import imganhdn from '../../art_anh/image/imagesNha.jpg'
import { useNavigate } from 'react-router-dom'
import { UserHook } from '../../hooks/UserHook'
import *as UserServices from '../../services/UserServices'
import *as message from '../../components/Message/Message'

const Singin = () => {
    const [email, setEmail] = useState('')

    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confimPassword, setcomfimPass] = useState('')

    const mutations = UserHook(
        data => UserServices.singIn(data)
    )
    const { data, isLoading, isSuccess, isError } = mutations

    // useEffect(() => {
    //     if (isSuccess) {
    //         message.success()
    //         headlbutndk()
    //     } else if (isError) {
    //         message.error()
    //     }

    // }, [isSuccess, isError])
    console.log("mutay", mutations)
    const headlOnchangeEmail = (value) => {
        setEmail(value)
    }
    const headlOnchangepassword = (value) => {
        setPassword(value)
    }
    const headlOnchangecomfimPass = (value) => {
        setcomfimPass(value)
    }
    const headClickDN = () => {
        navigate('/login')
    }
    const headlbutndk = () => {
        if (email.trim() !== "" && password.trim() !== "" && confimPassword.trim() !== "") {
            mutations.mutate({
                email,
                password,
                confimPassword


            })

            console.log('singin', email, password, confimPassword)

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
                        <h1>Xin chao</h1>
                        <p>Đăng ký tài khoản</p>
                        <InputForm input placeholder='nam@gmail.com' value={email} headlOnchange={headlOnchangeEmail} />
                        <InputForm placeholder='password' value={password} headlOnchange={headlOnchangepassword} />
                        <InputForm placeholder='comfimPass' value={confimPassword} headlOnchange={headlOnchangecomfimPass} />
                        {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    </div>

                    <Button
                        onClick={headlbutndk}

                        disabled={false} className='ButtonDN'>

                        Đăng Ký
                    </Button>
                    <div>


                        <p>________ Hoặc _________</p>
                        <p onClick={headClickDN}>Bạn đã có tài khoản? Đăng nhập</p>

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

export default Singin
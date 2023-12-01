import React, { useState } from 'react'
import { UserHook } from '../../hooks/UserHook'
import *as ProDuctServicesUer from '../../services/ProDuctServicesUser'
import InputForm from '../InputForm/InputForm'
import { Button } from 'antd'
import { useSelector } from 'react-redux'


const UserProduct = () => {
    const user = useSelector((state) => state?.user);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImg] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('')
    const [romm, setRomm] = useState('')
    const [soluong, setSoluong] = useState('')
    const [description, setDescription] = useState('')

    const mutations = UserHook(


        data => ProDuctServicesUer.createProductUser(data)
    )
    const { dataa, isLoading, isSuccess, isError } = mutations

    console.log("mutations", mutations)

    const headlOnchangeName = (value) => {
        setName(value)
    }
    const headlOnchangeSoluong = (value) => {
        setSoluong(value)
    }
    const headlOnchangeEmail = (user) => {
        setEmail(user?.email)
    }
    const headlOnchangeDe = (value) => {
        setDescription(value)
    }
    const headlOnchangeRom = (value) => {
        setRomm(value)
    }
    const headlOnchangeimg = (value) => {
        setImg(value)
    }
    const headlOnchangePrive = (value) => {
        setPrice(value)
    }
    const headlOnchangeaddre = (value) => {
        setAddress(value)
    }
    console.log("email", email)

    // const headClickDN = () => {
    //     navigate('/login')
    // }
    const headlbutndk = () => {
        if (name.trim() !== "") {
            mutations.mutate({
                name,
                email: user?.email,
                soluong,
                description,
                romm,
                address,
                price,
                image,



            })

            console.log('singin', email)

        }
        else {
            alert("ban can nhap dai du thong tin")
        }
    }

    return (
        <div>
            <div>
                <label>Name</label>
                <InputForm input placeholder='nam@gmail.com' value={name} headlOnchange={headlOnchangeName} />
                <label>Email</label>

                {/* <InputForm input placeholder='nam@gmail.com' value={email} headlOnchange={headlOnchangeEmail} /> */}
                <label>Số lượng</label>
                <InputForm input placeholder='nam@gmail.com' value={soluong} headlOnchange={headlOnchangeSoluong} />
                <label>Mo Ta</label>
                <InputForm input placeholder='nam@gmail.com' value={description} headlOnchange={headlOnchangeDe} />
                <label>Rom</label>
                <InputForm input placeholder='nam@gmail.com' value={romm} headlOnchange={headlOnchangeRom} />
                <label>dịa chi</label>
                <InputForm input placeholder='nam@gmail.com' value={address} headlOnchange={headlOnchangeaddre} />
                <label>Giá</label>
                <InputForm input placeholder='nam@gmail.com' value={price} headlOnchange={headlOnchangePrive} />
                <label>ime</label>
                <InputForm input placeholder='nam@gmail.com' value={image} headlOnchange={headlOnchangeimg} />




            </div>

            <Button
                onClick={headlbutndk}

                disabled={false} className='ButtonDN'>

                Đăng Ký
            </Button>


        </div>
    )
}

export default UserProduct
import { Button } from 'antd'
import React, { useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import { UserHook } from '../../hooks/UserHook'
import *as ProDuctServicesUer from '../../services/ProDuctServicesUser'


const SanPham = () => {

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
    const { data, isLoading, isSuccess, isError } = mutations

    console.log("mutations", mutations)

    const headlOnchangeName = (value) => {
        setName(value)
    }
    const headlOnchangeSoluong = (value) => {
        setSoluong(value)
    }
    const headlOnchangeEmail = (value) => {
        setEmail(value)
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

    // const headClickDN = () => {
    //     navigate('/login')
    // }
    const headlbutndk = () => {
        if (name.trim() !== "") {
            mutations.mutate({
                name,
                email,
                soluong,
                description,
                romm,
                address,
                price,
                image,



            })

            console.log('singin', name)

        }
        else {
            alert("ban can nhap dai du thong tin")
        }
    }
    return (
        <div>

            <div>

                <InputForm input placeholder='nam@gmail.com' value={name} headlOnchange={headlOnchangeName} />
                <InputForm input placeholder='nam@gmail.com' value={email} headlOnchange={headlOnchangeEmail} />
                <InputForm input placeholder='nam@gmail.com' value={soluong} headlOnchange={headlOnchangeSoluong} />
                <InputForm input placeholder='nam@gmail.com' value={description} headlOnchange={headlOnchangeDe} />
                <InputForm input placeholder='nam@gmail.com' value={romm} headlOnchange={headlOnchangeRom} />
                <InputForm input placeholder='nam@gmail.com' value={address} headlOnchange={headlOnchangeaddre} />
                <InputForm input placeholder='nam@gmail.com' value={price} headlOnchange={headlOnchangePrive} />
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

export default SanPham
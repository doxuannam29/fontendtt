
import React, { useEffect, useState } from 'react'
import './profile.scss'
import InputForm from '../../components/InputForm/InputForm'
import { Button, Menu, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import *as UserServices from '../../services/UserServices'
import { UserHook } from '../../hooks/UserHook'
import { updateUser } from '../../redux/slider/UserSlide'
import Upload from 'antd/es/upload/Upload'
import { UploadOutlined } from '@ant-design/icons'
import { getBase64, getItem } from '../../util'
import AdminUser from '../../components/AdminUser/AdminUser'
import AdminProduct from '../../components/AdminProduct/AdminProduct'
import { FileTextOutlined, FileDoneOutlined, } from '@ant-design/icons'
import *as ProDuctServiceUser from '../../services/ProDuctServices'
import Cardcomponts from '../../components/Cardcomponts/Cardcomponts'
import { useQuery } from '@tanstack/react-query'






const ProfilePage = () => {

    const user = useSelector((state) => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = UserHook(
        (data) => {
            const { id, ...rests } = data
            UserServices.upDate(id, rests)
        }
    )
    const dispatch = useDispatch()
    const { data, isLoading, isSuccess, isError } = mutation




    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPassword(user?.password)
        setAddress(user?.address)
        setPhone(user?.phone)
        setAvatar(user?.avatar)

    }, [user])


    useEffect(() => {
        if (isSuccess) {
            message.success()
            headlDetaiUser(user?.id, user?.access_token)

        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const headlDetaiUser = async (id, token) => {
        const res = await UserServices.getId(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
        // console.log('res', res)
    }
    const headlOnchangeNamehhh = (value) => {
        setName(value)

    }
    const headlOnchangeEmail = (value) => {
        setEmail(value)


    }
    const headlOnchangePass = (value) => {
        setPassword(value)

    }
    const headlOnchangeAddress = (value) => {
        setAddress(value)

    }
    const headlOnchangePhone = (value) => {
        setPhone(value)

    }
    const headlOnchangeAvata = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview)

    }
    const headlUpdate = () => {
        mutation.mutate({ id: user?.id, name, address, password, phone, avatar })


    }

    const getAllProductsByUser = async (email) => {
        const res = await ProDuctServiceUser.getProductEmail(email);
        return res;
    };

    const queryProduct = useQuery(['productuser', email], () => getAllProductsByUser(email));

    const { data: productuser, isLoading: isLoadingProdcut } = queryProduct


    return (
        <div className='tong'>
            <div className='hh'>
                <h1>Thông tin người dùng</h1>
                <div className='the'>
                    <div className='gach'>
                        <label>Email</label>
                        <label style={{ with: '10px' }}>{user?.email}</label>


                    </div>
                    <div className='gach'>
                        <label>Name</label>
                        <InputForm style={{ with: '10px' }} id='name' value={name} headlOnchange={headlOnchangeNamehhh} />

                    </div>

                    <div className='gach'>
                        <label>Password</label>
                        <InputForm style={{ with: '10px' }} id='password' value={password} headlOnchange={headlOnchangePass} />

                    </div>
                    <div className='gach'>
                        <label>Address</label>
                        <InputForm style={{ with: '10px' }} id='address' value={address} headlOnchange={headlOnchangeAddress} />

                    </div>
                    <div className='gach'>
                        <label>Phone</label>
                        <InputForm style={{ with: '10px' }} id='phone' value={phone} headlOnchange={headlOnchangePhone} />

                    </div>
                    <div className='gach'>
                        <label htmlFor="avatar" >Avatar</label>
                        <Upload headlOnchange={headlOnchangeAvata} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar" />
                        )}


                    </div>
                    <Button className='buttn' onClick={headlUpdate} >Cập Nhật</Button>
                </div>
            </div>
            <div className='Ro'>
                {productuser?.data?.map((productuser) => {

                    return (
                        <Cardcomponts className='cadsp'
                            key={productuser._id}

                            address={productuser.address}
                            description={productuser.description}
                            image={productuser.image}
                            name={productuser.name}
                            price={productuser.price}
                            romm={productuser.romm}
                            type={productuser.type}
                            soluong={productuser.soluong}

                            id={productuser._id}
                        />
                    )
                })}

            </div>


        </div>
    )
}

export default ProfilePage
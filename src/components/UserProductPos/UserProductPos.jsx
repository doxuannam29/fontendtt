import { Button, Checkbox, Form, Input, Modal, Upload } from 'antd'

import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import { getBase64 } from '../../util';
import *as ProDuctServices from '../../services/ProDuctServices'
import *as ProDuctServicesUser from '../../services/ProDuctServicesUser'
import { UserHook } from '../../hooks/UserHook'
import Loading from '../LoadingComponent/Loading';
import *as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import { useSelector } from 'react-redux';
import { ClockCircleOutlined } from '@ant-design/icons';



const UserProductPos = () => {
    const email = useSelector((state) => state?.user?.email);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [rowSelected, setRowSelected] = useState('')

    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)

    const inittial = () => ({
        name: '',
        image: '',
        email: '',
        price: '',
        address: '',
        romm: '',
        soluong: '',
        description: '',
    })


    const [form] = Form.useForm();
    const [stateProduct, setStateProduct] = useState(inittial())
    const [stateProductDetails, setStateProductDetails] = useState(inittial())

    // const getAllProductsByUser = async (email) => {
    //     const res = await ProDuctServicesUser.getProductUer(email)
    //     return res
    // }
    // const queryProduct = getAllProductsByUser(email);
    // console.log('Thông tin người dùng có cùng email:', queryProduct);
    const mutation = UserHook(
        (data) => {
            const { name, image, price, address, romm, soluong, description } = data

            const res = ProDuctServicesUser.createProductUser({
                name,
                image,
                email,
                price,
                address,
                romm,
                soluong,
                description
            })

            return res

        }

    )

    const getAllProductsByUser = async (email) => {
        const res = await ProDuctServicesUser.getProductUer(email);
        return res;
    };

    const queryProduct = useQuery(['productuser', email], () => getAllProductsByUser(email));



    // const queryProduct = useQuery({
    //     queryKey: ['productuser'],
    //     queryFn: getAllProductsByUser,

    // })


    const { data: productuser, isLoading: isLoadingProdcut } = queryProduct
    console.log('Thông :', productuser);


    const henadeldelet = () => {
        console.log('id ', rowSelected)
        //  setIsModalOpenDelete(true)
    }

    const renderAction = () => {
        return (
            <div>
                <ClockCircleOutlined style={{ color: 'orangered', backgroundColor: 'rgb(237, 203, 9)', fontSize: '30px', cursor: 'pointer', margin: '10px', borderRadius: '15px' }} onClick={henadeldelet} />

            </div>
        )
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = productuser?.data?.length && productuser?.data?.map((productuser) => {
        return { ...productuser, key: productuser._id }
    })



    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            image: '', type: '',
            price: '', address: '',
            romm: '',
            soluong: '',
            description: ''
        })
        form.resetFields()
    };


    // const onFinish = () => {
    //     mutation.mutate(stateProduct, {
    //         onSettled: () => {
    //             queryProduct.refetch()
    //         }
    //     })


    // }

    const mutationDeleted = UserHook(
        (data) => {
            const { id } = data

            const res = ProDuctServicesUser.deleteProductUser(
                id,

            )
            return res

        }

    )
    const { data, isError, isSuccess, isLoading } = mutation
    const { data: dataDeleted, isSuccess: iSuccessDelete } = mutationDeleted

    const headleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
        handleCancelDelete()



    }
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }


    const headlOnchange = (e) => {
        setStateProduct({
            ...stateProduct, [e.target.name]: e.target.value
        })

    }

    const headlOnchangeProduct = (e) => {
        setStateProductDetails({
            ...stateProductDetails, [e.target.name]: e.target.value
        })

    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })

    }
    const handleOnchangeAvatarDeth = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })

    }

    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
        handleCancel()


    }


    return (
        <div>
            <h1>Chờ Duyệt Bài Đăng</h1>
            <div>
                <Button className='btnAdd' onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined />
                </Button>
            </div>

            <TableComponent columns={columns} isLoading={isLoadingProdcut} data={dataTable}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)

                        }, // click row

                    };
                }}
            />
            <ModalComponent forceRender title="Tạo Bài Đăng" open={isModalOpen} onCancel={handleCancel} footer={null}>
                {/* <Loading isLoading={isLoading}></Loading> */}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}

                    onFinish={onFinish}
                    form={form}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name' }]}
                    >
                        <Input value={stateProduct.name} onChange={headlOnchange} name='name' />
                    </Form.Item>

                    {/* <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input value={email} onChange={headlOnchange} name='email' />
                    </Form.Item> */}

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <Input value={stateProduct.price} onChange={headlOnchange} name='price' />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input value={stateProduct.address} onChange={headlOnchange} name='address' />
                    </Form.Item>

                    <Form.Item
                        label="Romm"
                        name="romm"
                        rules={[{ required: true, message: 'Please input your romm!' }]}
                    >
                        <Input value={stateProduct.romm} onChange={headlOnchange} name='romm' />
                    </Form.Item>
                    <Form.Item
                        label="Soluong"
                        name="soluong"
                        rules={[{ required: true, message: 'Please input your soluong!' }]}
                    >
                        <Input value={stateProduct.soluong} onChange={headlOnchange} name='soluong' />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <Input value={stateProduct.description} onChange={headlOnchange} name='description' />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: false, message: 'Please input your description!' }]}
                    >
                        <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button >Select File</Button>
                        </Upload>
                        {stateProduct?.image && (
                            <img src={stateProduct?.image} style={{
                                height: '60px',
                                width: '60px',
                                // borderRadius: '50%',
                                objectFit: 'cover',

                            }} alt="anh" />
                        )}

                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>

            </ModalComponent>


            <ModalComponent title="Xoá bài đăng này" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={headleDeleteProduct} >
                <div>Bạn có muốn xóa bài đăng này không?</div>

            </ModalComponent>
        </div>
    )
}

export default UserProductPos
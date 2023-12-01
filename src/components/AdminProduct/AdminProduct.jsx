
import { Button, Checkbox, Form, Input, Modal, Space, Upload } from 'antd'
import './style.scss'
import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import { getBase64 } from '../../util';
import *as ProDuctServices from '../../services/ProDuctServices'
import { UserHook } from '../../hooks/UserHook'
import Loading from '../LoadingComponent/Loading';
import *as message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import ModalComponent from '../ModalComponent/ModalComponent';


const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const searchInput = useRef(null);

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

    const mutation = UserHook(
        (data) => {
            const { name, image, email, price, address, romm, soluong, description } = data

            const res = ProDuctServices.createProduct({
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
    const mutationUpdate = UserHook(
        (data) => {
            const { id, ...resets } = data

            const res = ProDuctServices.udateProduct(
                id,

                { ...resets })
            return res

        }

    )
    const mutationDeleted = UserHook(
        (data) => {
            const { id } = data

            const res = ProDuctServices.deleteProduct(
                id,

            )
            return res

        }

    )
    const getAllProductd = async () => {
        const res = await ProDuctServices.getAllProduct()
        return res
    }

    const fetchProducdeth = async (rowSelected) => {
        const res = await ProDuctServices.getProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                image: res?.data?.image,
                email: res?.data?.email,
                price: res?.data?.price,
                address: res?.data?.address,
                romm: res?.data?.romm,
                soluong: res?.data?.soluong,
                description: res?.data?.description,
            })
        }

    }
    useEffect(() => {
        form.setFieldsValue(stateProductDetails)
    }, [form, stateProductDetails])
    useEffect(() => {
        if (rowSelected) {
            fetchProducdeth(rowSelected)
        }

    }, [rowSelected])

    console.log('staePr', stateProductDetails)

    const headleProduct = () => {
        if (rowSelected) {
            fetchProducdeth()
        }
        setIsOpenDrawer(true)
    }


    const { data, isError, isSuccess, isLoading } = mutation

    const { data: dataUpdated, isError: isErrored, isSuccess: iSuccessed } = mutationUpdate

    const { data: dataDeleted, isSuccess: iSuccessDelete } = mutationDeleted
    console.log('dataupdate', dataUpdated)
    const queryProduct = useQuery({
        queryKey: ['product'],
        queryFn: getAllProductd,

    })
    const { data: product, isLoading: isLoadingProdcut } = queryProduct

    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, ...stateProductDetails }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
        setIsOpenDrawer(false)


    }
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

    const renderAction = () => {
        return (
            <div>
                <i class="fa-solid fa-trash" style={{ color: 'red', fontSize: '20px', cursor: 'pointer', margin: '10px' }} onClick={() => setIsModalOpenDelete(true)}></i>
                <i class="fa-regular fa-pen-to-square" style={{ fontSize: '20px', cursor: 'pointer' }} onClick={headleProduct}></i>
            </div>
        )
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
    });
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,

        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,

        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = product?.data?.length && product?.data?.map((product) => {
        return { ...product, key: product._id }
    })

    useEffect(() => {
        if (isSuccess && data?.status === 'okk') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            image: '', email: '',
            price: '', address: '',
            romm: '',
            soluong: '',
            description: ''
        })
        form.resetFields()
    };


    const onFinish = () => {
        mutation.mutate(stateProduct, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })


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


    return (
        <div>
            <h1>Quản Lý Bài Đăng</h1>

            <div>
                <Button className='btnAdd' onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingProdcut} data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id)
                            }, // click row

                        };
                    }}
                />
            </div>
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

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input value={stateProduct.email} onChange={headlOnchange} name='email' />
                    </Form.Item>

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
                        {/* <Input value={stateProduct.image} onChange={headlOnchange} name='image' /> */}
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                </Form>

            </ModalComponent>
            <DrawerComponent title='Chi tiết bài đăng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='50%'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}

                    onFinish={onUpdateProduct}
                    form={form}
                    autoComplete="on"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name' }]}
                    >
                        <Input value={stateProductDetails['name']} onChange={headlOnchangeProduct} name='name' />
                    </Form.Item>

                    {/* <Form.Item
                        label="Email"
                        name="Email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input value={stateProductDetails.email} onChange={headlOnchangeProduct} name='email' />
                    </Form.Item> */}

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <Input value={stateProductDetails.price} onChange={headlOnchangeProduct} name='price' />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input value={stateProductDetails.address} onChange={headlOnchangeProduct} name='address' />
                    </Form.Item>

                    <Form.Item
                        label="Romm"
                        name="romm"
                        rules={[{ required: true, message: 'Please input your romm!' }]}
                    >
                        <Input value={stateProductDetails.romm} onChange={headlOnchangeProduct} name='romm' />
                    </Form.Item>
                    <Form.Item
                        label="Soluong"
                        name="soluong"
                        rules={[{ required: true, message: 'Please input your soluong!' }]}
                    >
                        <Input value={stateProductDetails.soluong} onChange={headlOnchangeProduct} name='soluong' />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                    >
                        <Input value={stateProductDetails.description} onChange={headlOnchangeProduct} name='description' />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: false, message: 'Please input your description!' }]}
                    >
                        <Upload onChange={handleOnchangeAvatarDeth} maxCount={1}>
                            <Button >Select File</Button>
                        </Upload>
                        {stateProductDetails?.image && (
                            <img src={stateProductDetails?.image} style={{
                                height: '60px',
                                width: '60px',
                                // borderRadius: '50%',
                                objectFit: 'cover',

                            }} alt="anh" />
                        )}
                        {/* <Input value={stateProductDetails.image} onChange={headlOnchangeProduct} name='image' /> */}
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>

                </Form>
            </DrawerComponent>

            <ModalComponent title="Xoá Sản Phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={headleDeleteProduct} >
                <div>Bạn có muốn xóa bài đăng này không</div>

            </ModalComponent>
        </div>
    )
}

export default AdminProduct
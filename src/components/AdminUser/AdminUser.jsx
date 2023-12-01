
import { Button, Form, Input, Space, Upload } from 'antd'
import './style.scss'
import React, { useEffect, useRef, useState } from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { getBase64 } from '../../util';
import { UserHook } from '../../hooks/UserHook';
import { useQuery } from '@tanstack/react-query';
import *as message from '../../components/Message/Message'
import *as UserServices from '../../services/UserServices'




const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const searchInput = useRef(null);

    const inittial = () => ({
        name: '',
        avatar: '',
        address: '',
        phone: '',
        password: '',
        email: '',
        isAdmin: false,

    })

    const [form] = Form.useForm();
    const [stateUser, setStateUser] = useState(inittial())
    const [stateUserDetails, setStateUserDetails] = useState(inittial())

    const mutation = UserHook(
        (data) => {
            const { name,
                avatar,
                address,
                phone,
                password,
                email, } = data

            const res = UserServices.singIn({
                name,
                avatar,
                address,
                phone,
                password,
                email
            })
            return res

        }

    )
    const mutationUpdate = UserHook(
        (data) => {
            const { id, ...resets } = data

            const res = UserServices.upDate(
                id,

                { ...resets })
            return res

        }

    )
    const mutationDeleted = UserHook(
        (data) => {
            const { id } = data

            const res = UserServices.deleteUser(
                id,

            )
            return res

        }

    )
    const getAllUser = async () => {
        const res = await UserServices.getAlluser()
        return res
    }

    const fetchUserdeth = async (rowSelected) => {
        const res = await UserServices.getId(rowSelected)
        if (res?.data) {

            setStateUserDetails({
                name: res?.data?.name,
                avatar: res?.data?.avatar,
                address: res?.data?.address,
                phone: res?.data?.phone,
                password: res?.data?.password,
                email: res?.data?.email,
                isAdmin: res?.data?.isAdmin,

            })
        }

    }
    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])
    useEffect(() => {
        if (rowSelected) {
            fetchUserdeth(rowSelected)
        }

    }, [rowSelected])


    const headleProduct = () => {
        if (rowSelected) {
            fetchUserdeth()
        }
        setIsOpenDrawer(true)
    }


    const { data, isError, isSuccess, isLoading } = mutation

    const { data: dataUpdated, isError: isErrored, isSuccess: iSuccessed } = mutationUpdate

    const { data: dataDeleted, isSuccess: iSuccessDelete } = mutationDeleted
    console.log('dataupdate', dataUpdated)


    const queryUser = useQuery({
        queryKey: ['user'],
        queryFn: getAllUser,

    })
    const { data: user, isLoading: isLoadingUser } = queryUser

    const onUpdateProduct = () => {
        mutationUpdate.mutate({ id: rowSelected, ...stateUserDetails }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
        setIsOpenDrawer(false)


    }
    const headleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected }, {
            onSettled: () => {
                queryUser.refetch()
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
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                }
            ],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable = user?.data?.length && user?.data?.map((user) => {
        return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' }
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
        setStateUser({
            name: '',
            avatar: '',
            address: '',
            phone: '',
            password: '',
            email: '',
        })
        form.resetFields()
    };


    const onFinish = () => {
        mutation.mutate(stateUser, {
            onSettled: () => {
                queryUser.refetch()
            }
        })


    }


    const headlOnchange = (e) => {
        setStateUser({
            ...stateUser, [e.target.name]: e.target.value
        })

    }

    const headlOnchangeProduct = (e) => {
        setStateUserDetails({
            ...stateUserDetails, [e.target.name]: e.target.value
        })

    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUser({
            ...stateUser,
            avatar: file.preview
        })

    }
    const handleOnchangeAvatarDeth = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview
        })

    }
    return (
        <div>
            <h1>Quản lý người dùng</h1>

            <div>

                {/* <Button className='btnAdd' onClick={() => setIsModalOpen(true)}>
                    <PlusOutlined />
                </Button> */}
            </div>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isLoading={isLoadingUser} data={dataTable}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id)
                            }, // click row

                        };
                    }}
                />
            </div>
            <ModalComponent forceRender title="Tạo Sản Phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                        <Input value={stateUser.name} onChange={headlOnchange} name='name' />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <Input value={stateUser.email} onChange={headlOnchange} name='email' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <Input value={stateUser.password} onChange={headlOnchange} name='password' />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input value={stateUser.address} onChange={headlOnchange} name='address' />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your romm!' }]}
                    >
                        <Input value={stateUser.phone} onChange={headlOnchange} name='phone' />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="avatar"
                        rules={[{ required: false, message: 'Please input your description!' }]}
                    >
                        <Upload onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button >Select File</Button>
                        </Upload>
                        {stateUser?.avatar && (
                            <img src={stateUser?.avatar} style={{
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
            <DrawerComponent title='Chi tiết người dùng' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width='50%'>
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
                        <Input value={stateUserDetails['name']} onChange={headlOnchangeProduct} name='name' />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                    >
                        <Input value={stateUserDetails.email} onChange={headlOnchangeProduct} name='email' />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <Input value={stateUserDetails.password} onChange={headlOnchangeProduct} name='password' />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input value={stateUserDetails.address} onChange={headlOnchangeProduct} name='address' />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input your romm!' }]}
                    >
                        <Input value={stateUserDetails.phone} onChange={headlOnchangeProduct} name='phone' />
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="avatar"
                        rules={[{ required: false, message: 'Please input your description!' }]}
                    >
                        <Upload onChange={handleOnchangeAvatarDeth} maxCount={1}>
                            <Button >Select File</Button>
                        </Upload>
                        {stateUserDetails?.avatar && (
                            <img src={stateUserDetails?.avatar} style={{
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

            <ModalComponent title="Xoá người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={headleDeleteProduct} >
                <div>Bạn có muốn xóa người dùng này không</div>

            </ModalComponent>

        </div>
    )
}

export default AdminUser
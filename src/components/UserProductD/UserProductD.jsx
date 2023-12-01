import React, { useRef, useState } from 'react'
import TableComponent from '../TableComponent/TableComponent';
import { getBase64 } from '../../util';
import { useSelector } from 'react-redux';
import { Button, Form, Input, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import *as ProDuctServices from '../../services/ProDuctServices'
import { CheckSquareOutlined, SearchOutlined } from '@ant-design/icons';




const UserProductD = () => {
    const email = useSelector((state) => state?.user?.email);
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

    // const getAllProductsByUser = async (email) => {
    //     const res = await ProDuctServicesUser.getProductUer(email)
    //     return res
    // }
    // const queryProduct = getAllProductsByUser(email);
    // console.log('Thông tin người dùng có cùng email:', queryProduct);

    const getAllProductsByUser = async (email) => {
        const res = await ProDuctServices.getProductEmail(email);
        return res;
    };

    const queryProduct = useQuery(['productuser', email], () => getAllProductsByUser(email));



    // const queryProduct = useQuery({
    //     queryKey: ['productuser'],
    //     queryFn: getAllProductsByUser,

    // })


    const { data: productuser, isLoading: isLoadingProdcut } = queryProduct
    console.log('Thông :', productuser);




    const renderAction = () => {
        return (
            <div>
                <CheckSquareOutlined style={{ color: 'green', fontSize: '30px', cursor: 'pointer', margin: '10px', backgroundColor: 'greenyellow' }} />

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
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            ...getColumnSearchProps('price')
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
        <div><h1>Bài Đăng Đã Duyệt</h1>


            <TableComponent columns={columns} isLoading={isLoadingProdcut} data={dataTable}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }, // click row

                    };
                }}
            /></div>
    )
}

export default UserProductD
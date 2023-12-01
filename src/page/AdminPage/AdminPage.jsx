
import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../util';
import { UserOutlined, AppstoreOutlined, } from '@ant-design/icons'
import Loading from '../../components/LoadingComponent/Loading';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminProductUser from '../../components/AdminProductUser/AdminProducUser';
import { FileTextOutlined } from '@ant-design/icons'



const AdminPage = () => {
    const items = [
        getItem('Người Dùng', 'user', <UserOutlined />),


        getItem('Sản Phẩm', 'product', <AppstoreOutlined />),
        getItem('Phê Duyệt Bài', 'productuser', <FileTextOutlined />),
    ];

    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'product':
                return (
                    <AdminProduct />
                )
            case 'productuser':
                return (
                    <AdminProductUser />
                )
            default:
                return <></>
        }
    }



    const handleOnCLick = ({ key }) => {

        setKeySelected(key)
    }
    console.log('keySelected', keySelected)
    //   console.log('memoCount', memoCount)

    return (
        <>
            {/* <HeaderComponent isHiddenSearch isHiddenCart /> */}
            <div style={{ display: 'flex', overflowX: 'hidden' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        height: '100vh',

                    }}
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>

                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )

}

export default AdminPage
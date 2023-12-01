import React from 'react'
import { getItem } from '../../util';
import UserProduct from '../../components/UserProduct/UserProduct';
import UserProductPos from '../../components/UserProductPos/UserProductPos';
import { Menu } from 'antd';
import { useState } from 'react';
import { FileTextOutlined, FileDoneOutlined, } from '@ant-design/icons'
import UserProductD from '../../components/UserProductD/UserProductD';


const SanPhamUser = () => {
    const items = [
        // getItem('Bài Đăng', 'product', <FileTextOutlined />),


        getItem('Chờ Duyệt', 'productuser', <FileTextOutlined />),
        getItem('Đã Duyệt', 'productuserd', <FileDoneOutlined />),
    ];

    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
        switch (key) {
            // case 'product':
            //     return (
            //         <UserProduct />
            //     )
            case 'productuser':
                return (
                    <UserProductPos />
                )
            case 'productuserd':
                return (
                    <UserProductD />
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

        <div>
            <div className='qluser'>
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
            </div>

        </div>
    )
}

export default SanPhamUser
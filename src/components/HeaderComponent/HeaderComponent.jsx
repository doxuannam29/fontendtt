import React, { useEffect, useState } from 'react';
import { Button, Col, Popover, Row } from 'antd'
import './style.scss'
import { UserOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import *as UserServices from '../../services/UserServices'
import { resetUser } from '../../redux/slider/UserSlide'
import { searchProduct } from '../../redux/slider/productSlide ';
import ButttonInputSearch from '../ButttonInputSearch/ButttonInputSearch';



const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [userName, setuserName] = useState('')
    const user = useSelector((state) => state.user)
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')


    const handleNaviD = () => {
        navigate('/login')
    }
    const handleNaviDk = () => {
        navigate('/singin')
    }
    const handleNaviMN = () => {
        navigate('/type')
    }
    const handLogout = async () => {
        await UserServices.logoutUser()
        dispatch(resetUser())
        navigate('/type')
    }

    useEffect(() => {
        setuserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])


    const content = (
        <div className='uss' style={{ cursor: "pointer" }}>
            <p className='us' onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</p>
            {user?.isAdmin && (

                <p className='us' onClick={() => handleClickNavigate('admin')} >Quản lí hệ thống</p>
            )}
            <p className='us' onClick={() => handleClickNavigate('sanphamuer')}>Bài Đăng</p>
            <p className='us' onClick={handLogout} >Đăng xuất</p>
        </div>

    );
    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile')
        } else if (type === 'admin') {
            navigate('/admin')
        } else if (type === 'sanphamuer') {
            navigate('/sanphamuer')
        } else {
            handLogout()
        }
        setIsOpenPopup(false)
    }
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }
    return (


        <div className='headered'>
            <Row className='header' style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
                <Col span={5}>
                    <h1 className='shop' onClick={handleNaviMN} >NHATRO</h1 >
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButttonInputSearch
                            size="large"
                            bordered={false}
                            textbutton="Tìm kiếm"
                            placeholder="input search text"
                            onChange={onSearch}
                            backgroundColorButton="#5a20c1"
                        />


                        {/* <ul class="nav-list">
                        <li class="nav-item"><i class="fa-solid fa-house"></i> Trang Chủ</li>
                        <li onClick={handleNaviMN} class="nav-item"> <i class="fa-regular fa-clock"></i> Mới nhất</li>
                        <li class="nav-item"><i class="fa-regular fa-circle-question"></i> Hỗ Trợ</li>
                    </ul>
                    <input id="keywordHeader" type="text" name="q" placeholder="Tìm kiếm" autocomplete="off"></input> */}





                    </Col>
                )}
                <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
                    <div className='acll'>
                        {userAvatar ? (
                            <img src={userAvatar} alt="avatar" style={{
                                height: '30px',
                                width: '30px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} />
                        ) : (
                            <UserOutlined style={{ fontSize: '30px' }} />
                        )}

                        {user?.access_token ? (
                            <>
                                <Popover content={content} trigger="click" open={isOpenPopup}>
                                    <div style={{ cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                                </Popover>
                            </>
                        ) : (
                            <div style={{ cursor: 'pointer' }}>

                                <span onClick={handleNaviDk}
                                    class="nav-item">  Đăng Ký</span>
                                <span
                                    onClick={handleNaviD}
                                    class="nav-item">Đăng Nhập</span>


                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>


    );
}

export default HeaderComponent;
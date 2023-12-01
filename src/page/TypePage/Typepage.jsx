import { Button, Col, Row } from 'antd'
import React from 'react'
import NavBarComponents from '../../components/Navbarcomponents/NavBarComponents'
import Cardcomponts from '../../components/Cardcomponts/Cardcomponts'
import './Typepage.scss'
import { useQuery } from '@tanstack/react-query'

import *as ProDuctService from '../../services/ProDuctServices'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const Typepage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    // const searchDebounce = useDebounce(searchProduct, 500)

    const fetchProductAll = async () => {
        // const limit = context?.queryKey && context?.queryKey[1]
        // const search = context?.queryKey && context?.queryKey[2]
        const res = await ProDuctService.getAllProduct()
        return res

    }

    const { isLoading, data: product } = useQuery({
        queryKey: ['product'],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000
    })
    useEffect(() => {
        fetchProductAll()
    }, [])
    console.log('pro', product)


    return (

        <div>
            {/* <dir className="navhd">
                <ul>
                    <li>Phong Tro Moi Nhat</li>

                </ul>
                <ul>
                    <li>
                        <Button>Xem Thêm </Button>
                    </li>
                </ul>
            </dir> */}
            <Row className='Row'>
                {/* <Col span={5} className='Navbar' >

                    {product?.data?.map((product) => {

                        return (
                            <NavBarComponents
                                key={product.id}

                                address={product.address}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                romm={product.romm}
                                type={product.type}
                                soluong={product.soluong} />
                        )
                    })}



                </Col> */}

                <Col span={30} className='Cardsanphamty'>
                    {/* {courses.map((course, index) => {
                        return (
                            <Cardcomponts
                                key={index}
                                image={course.image_url}
                                title={course.title}
                                price={course.price}
                                diachi={course.diachi}
                                sophong={course.sophong}
                            />
                        );
                    })} */}
                    {product?.data?.map((product) => {

                        return (
                            <Cardcomponts
                                key={product._id}

                                address={product.address}
                                description={product.description}
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                romm={product.romm}
                                type={product.type}
                                soluong={product.soluong}

                                id={product._id}
                            />
                        )
                    })}


                </Col>

            </Row>

        </div>
    )
}

export default Typepage
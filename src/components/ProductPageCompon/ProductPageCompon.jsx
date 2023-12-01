import { Button, Col, Image, InputNumber, Row } from 'antd'
import React from 'react'
import imgProduct from '../../art_anh/image/nhadep.jpg'
import imgPronho from '../../art_anh/image/nhanho2.jpg'
import './stylepr.scss'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import *as ProDuctServices from '../../services/ProDuctServices'
import { useQuery } from '@tanstack/react-query'


const ProductPageCompon = ({ idProduct }) => {
    const onChange = () => {

    }
    const fetchProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        console.log('product', id);

        if (id) {

            const res = await ProDuctServices.getProduct(id);
            return res.data;

        }


    };

    const { data: productdel, isLoading: isLoadingProduct, isError: isErrorProduct } = useQuery(
        ['productdel', idProduct],
        fetchProduct,
        { enabled: !!idProduct }
    );

    console.log('product', productdel);




    return (
        <Row style={{ padding: '16px', backgroundColor: 'white' }}>
            <Col span={5}>
                <Image className='anhproduct' src={productdel?.image} alt='image product' preview={false} />
                <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <Col span={4} className='row_col'>
                        <Image className='imgage_con' src={imgPronho} alt='image nho' preview={false} />
                    </Col>
                    <Col className='row_col' span={4}>
                        <Image className='imgage_con' src={imgPronho} alt='image nho' preview={false} />
                    </Col>
                    <Col className='row_col' span={4}>
                        <Image className='imgage_con' src={imgPronho} alt='image nho' preview={false} />
                    </Col>
                    <Col className='row_col' span={4}>
                        <Image className='imgage_con' src={imgPronho} alt='image nho' preview={false} />
                    </Col>



                </Row>
            </Col>
            <Col style={{ padding: '10px' }} span={19}>
                <p className='tieude'>{productdel?.name}</p>
                <div>
                    <p>Số Phòng: {productdel?.soluong}</p>

                </div>
                <div className='divgia'>
                    <h2 className='gia'>{productdel?.price} đ</h2>
                </div>
                <div className='diachi'>
                    <span>Địa Chỉ :</span>
                    <span className='address'>{productdel?.address}</span>



                </div>
                <div style={{ fontSize: '15px' }}>
                    <span>Chi tiết:{productdel?.description}</span>
                </div>

                <div >
                    {/* <div>Số Lượng :</div> */}
                    {/* <div className='inputtt'>
                        <Button > <PlusOutlined /></Button>
                        <InputNumber className='inptu' min={1} max={10} defaultValue={3} onChange={onChange} />

                        <Button > <MinusOutlined /></Button>
                    </div> */}
                </div>

                <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
                    <div>
                        {/* <Button
                            size={40}
                            styleButton={{
                                backgroundColor: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '520px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            //onClick={handleAddOrderProduct}

                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        > Đặt Cọc</Button> */}
                        {/* {errorLimitOrder && <div style={{ color: 'red' }}>San pham het hang</div>} */}
                    </div>

                </div>


            </Col>
        </Row>
    )
}

export default ProductPageCompon
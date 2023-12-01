import { Card } from 'antd'
// import Meta from 'antd/es/card/Meta'
import React from 'react'
import './Cardstyle.scss'

import { useNavigate } from 'react-router-dom'

const Cardcomponts = (props) => {
    const navigate = useNavigate()
    const { address, description, image, name, price, romm, type, soluong, id } = props

    const headlProduct = (id) => {
        navigate(`/products/${id}`)


    }

    return (
        <div className='anh'>
            <Card
                hoverable
                bodyStyle={{ padding: '10px', marginTop: '4px' }}
                style={{ width: 244 }}
                cover={<img alt="example" src={image} />}

                onClick={() => headlProduct(id)}
            >

                <div className='Cardstyle'>

                    <p style={{ color: 'black', fontSize: '20px', fontWeight: 700 }}>{name}</p>
                </div>
                <div >


                    <p ><i class="fa-solid fa-bed"></i>{romm}  <i class="fa-solid fa-person-booth"></i> {soluong}</p>
                    <p><i class="fa-solid fa-location-dot"></i> {address}</p>
                    <div className='don'>
                        <span className="giad">₫</span>

                        <span class="gia" >{price}</span>

                    </div>



                </div>
            </Card>


        </div>




    )
}

export default Cardcomponts


// hoverable
// bodyStyle={{ padding: '10px', marginTop: '4px' }}
// style={{ width: 244 }}
// cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
// >

// <div className='Cardstyle'>

//     <p>Phong tro gia re</p>
// </div>
// <div >

//     <p>
//         <i class="fa-solid fa-location-dot"></i> Thái Nguyên</p>
//     <p><i class="fa-solid fa-bed"></i> 3 phong    <i class="fa-solid fa-person-booth"></i> 2 phong</p>
//     <p> <i class="fa-solid fa-house"></i> New 100%</p>



// </div>
import { Card } from 'antd'
// import Meta from 'antd/es/card/Meta'
import React from 'react'
import './Navbarstyle.scss'

const NavBarComponents = () => {
    return (

        <div className='Navbaranh'>

            <Card
                hoverable
                bodyStyle={{ padding: '10px', marginTop: '4px' }}
                style={{ width: 244 }}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >

                <div className='Navbarname'>
                    Phong cho gia dinh</div>

                <div >

                    <p>
                        <i class="fa-solid fa-location-dot"></i> Thái Nguyên</p>
                    <p><i class="fa-solid fa-bed"></i> 3 phong    <i class="fa-solid fa-person-booth"></i> 2 phong</p>
                    <p> <i class="fa-solid fa-house"></i> New 100%</p>



                </div>
            </Card>
        </div>

    )
}

export default NavBarComponents
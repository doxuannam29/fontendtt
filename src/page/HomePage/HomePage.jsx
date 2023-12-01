import React from 'react';
import './noname.scss'
import Cardcomponts from '../../components/Cardcomponts/Cardcomponts';
import { Button } from 'antd';
// import * as ProDuctServices from '../../services/ProDuctServices'
// import { useQuery } from '@tanstack/react-query'

const HomePage = () => {
    // const fetchProductAll = async () => {

    //     const res = await ProDuctServices.getAll()
    //     console.log('ress', res)
    // }


    // const { isLoading, data } = useQuery(['products'], fetchProductAll)


    return (
        <div className='Home'>
            <div className='Cardcomponents'>

                <Cardcomponts />
                <Cardcomponts />
                <Cardcomponts />
                <Cardcomponts />
                <Cardcomponts />
                <Cardcomponts />
                <Cardcomponts />
                <Cardcomponts />


            </div>
            <div className='buttonxem'>
                <Button className='xemthem'>Xem them</Button>

            </div>


        </div>
    );
}

export default HomePage;

import React from 'react';
import ProductPageCompon from '../../components/ProductPageCompon/ProductPageCompon';
import { useParams } from 'react-router-dom';


const ProductsPage = () => {
    const { id } = useParams()

    return (
        <div style={{ padding: '0 120px', height: '1000px', backgroundColor: '#eee3e3' }}>

            <div>
                <ProductPageCompon idProduct={id} />
            </div>
        </div>
    );
}

export default ProductsPage;
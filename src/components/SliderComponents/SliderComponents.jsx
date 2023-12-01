import Slider from 'react-slick';
import React from 'react'
import { Image } from 'antd';

const SliderComponents = ({ arrImages }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        aotopplay: true,
        aotopplaySpeed: 1000

    };
    return (
        <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="200px" />

                )
            })}
        </Slider>

    )
}

export default SliderComponents
import { Button, Input } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import ButtonComponent from '../Buttoncomponents/Buttoncomponents'


const ButttonInputSearch = (props) => {
    const {
        size, placeholder, textbutton,
        bordered, backgroundColorInput = '#fff',
        backgroundColorButton = 'rgb(13, 92, 182)',
        colorButton = '#fff'
    } = props

    return (
        <div style={{ display: 'flex', }}>
            <Input
                
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput }}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
                textbutton={textbutton}
                styleTextButton={{ color: colorButton }}
            />
        </div>
    )
}

export default ButttonInputSearch
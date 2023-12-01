import { Input } from 'antd'
import React, { useState } from 'react'
import './Inputstyle.scss'

const InputForm = (props) => {

    const { placeholder = 'Nhap thong tin', ...rets } = props
    const headlOnchangeInput = (e) => {
        props.headlOnchange(e.target.value)

    }
    return (
        <Input className='input' placeholder={placeholder} valueInput={props.value} {...rets} onChange={headlOnchangeInput}>
        </Input>
    )
}

export default InputForm
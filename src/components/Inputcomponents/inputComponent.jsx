import { Input } from 'antd'
import React from 'react'

const inputComponent = (size, placeholder, bordered, style, ...rests) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      bordered={bordered}
      style={style}
      {...rests}

    />
  )
}

export default inputComponent
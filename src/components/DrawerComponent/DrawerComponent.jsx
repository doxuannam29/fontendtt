
import { Drawer } from 'antd'
import React from 'react'

const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...resets }) => {
    return (
        <Drawer title={title} placement={placement} open={isOpen} {...resets}>
            {children}
        </Drawer>
    )
}

export default DrawerComponent
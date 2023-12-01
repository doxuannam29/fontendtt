import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title = 'dalo', isOpen = false, children, ...resets }) => {
    return (
        <div> <Modal title={title} open={isOpen} {...resets}>
            {children}
        </Modal></div>
    )
}

export default ModalComponent
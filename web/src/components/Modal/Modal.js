import { useState, useEffect, useRef } from 'react'
import { RiCloseLine } from 'react-icons/ri'

import useOnClickOutside from 'src/hooks/useOnClickOutside'
import Portal from 'src/components/Portal'

const Modal = ({ children, open, onModalClose }) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleClose = () => {
    setIsOpen(false)
    if (onModalClose) {
      onModalClose()
    }
  }

  useOnClickOutside(ref, handleClose)

  return (
    <>
      {isOpen && (
        <Portal selector="body">
          <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center px-5 bg-black bg-opacity-5">
            <div
              className="p-10 bg-white rounded-sm border-2 border-brand-purple relative"
              ref={ref}
            >
              <RiCloseLine
                className="absolute top-0 right-0 m-1 hover:cursor-pointer hover:text-gray-600 text-2xl"
                onClick={handleClose}
              />
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default Modal

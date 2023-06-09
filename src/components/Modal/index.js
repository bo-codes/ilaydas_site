import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []);

    return (
        <>
            <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, currentPost, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
      <div id="modal">
        <div id="modal-bg" onClick={onClose} />
        <div id="modal-content">
          {/* <div className="closeModal" onClick={onClose}>
                    X
                </div> */}
          {children}
        </div>
      </div>,
      modalNode
    );
}

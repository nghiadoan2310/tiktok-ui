import { useContext } from "react";
import classNames from "classnames/bind";

import styles from "./Modal.module.scss";
import { ModalContext } from "../Provider";

const cx = classNames.bind(styles);

function Modal({ children, className }) {
    const Context = useContext(ModalContext)

    const handleCancle = () => {
        Context.handleHideModal();
    }

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-overlay')} onClick={handleCancle}></div>
            <div className={cx('modal-body', className)}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
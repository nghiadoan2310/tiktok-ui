import { Fragment, useContext } from "react";
import classNames from "classnames/bind";

import styles from './LogoutModal.module.scss'
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import * as authService from '~/Services/authService'
import { ModalContext } from "~/components/Provider";
import { AuthContext } from "~/components/Provider";

const cx = classNames.bind(styles)

function LogoutModal() {

    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);

    const handleCancle = () => {
        ContextModal.handleHideModalLogOut();
    }

    const handleLogout = async () => {
        const data = await authService.postLogout(ContextAuth.tokenStr);

        if(!data) {
            alert('Đăng xuất thất bại')

        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            ContextModal.handleHideModalLogOut();
            window.location.href = '/';
        }
    }

    return (
        <Fragment>
            { ContextModal.activeLogOut && ContextModal.activeModal && 
                <Modal>
                    <div className={cx('modal-inner')}>
                        <p className={cx('title')}>Bạn có chắc chắn muốn đăng xuất?</p>
                        <div className={cx('buttons')}>
                            <Button className={cx('button', 'cancel')} onClick={handleCancle}>Hủy</Button>
                            <Button className={cx('button', 'confirm')} onClick={handleLogout}>Đăng xuất</Button>
                        </div>
                    </div>
                </Modal>
            }
        </Fragment>
    )
}

export default LogoutModal;
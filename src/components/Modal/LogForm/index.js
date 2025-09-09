import { Fragment, useContext, useState } from "react";
import classNames from "classnames/bind";

import styles from './LogForm.module.scss'
import Modal from "~/components/Modal";
import Button from "~/components/Button";
import { ModalContext } from "~/components/Provider";
import { AppleIcon, ArrowLeftIcon, CloseModalIcon, FacebookShareIcon, GoogleIcon, KakaoTalkIcon, LineShareIcon, ProfileIcon, QRcodeIcon, TwitterShareIcon } from "~/components/icons";
import LoginByEmail from "../LoginForm/LoginByEmail";
import SignupByEmail from "../SignupForm/SignupByEmail";

const cx = classNames.bind(styles)

const LOGIN_OPTIONS = {
    title: 'Đăng nhập vào TikTok',
    data: [
        {
            icon: <QRcodeIcon/>,
            title: 'Sử dụng mã QR',
            disabled: true 
        },
        {
            icon: <ProfileIcon width="2rem" height="2rem"/>,
            title: 'Sử dụng Email',
            children: {
                title: 'Đăng nhập',
                data: <LoginByEmail></LoginByEmail>,
            }
        },
        {
            icon: <FacebookShareIcon width="2rem" height="2rem"/>,
            title: 'Tiếp tục với Facebook',
            disabled: true 
        },
        {
            icon: <GoogleIcon/>,
            title: 'Tiếp tục với Google',
            disabled: true 
        },
        {
            icon: <TwitterShareIcon width="2rem" height="2rem"/>,
            title: 'Tiếp tục với Twitter',
            disabled: true 
        },
        {
            icon: <LineShareIcon width="2rem" height="2rem"/>,
            title: 'Tiếp tục với LINE',
            disabled: true 
        },
        {
            icon: <KakaoTalkIcon/>,
            title: 'Tiếp tục với KakaoTalk',
            disabled: true 
        },
        {
            icon: <AppleIcon/>,
            title: 'Tiếp tục với Apple',
            disabled: true 
        }
    ]
}


const SIGNUP_OPTIONS = {
    title: 'Đăng ký TikTok',
    data: [
        {
            icon: <ProfileIcon width="2rem" height="2rem"/>,
            title: 'Sử dụng Email',
            children: {
                title: 'Đăng ký',
                data: <SignupByEmail />,
            }
        },
        {
            icon: <FacebookShareIcon width="2rem" height="2rem"/>,
            title: 'Tiếp tục với Facebook',
            disabled: true 
        },
        {
            icon: <GoogleIcon/>,
            title: 'Tiếp tục với Google',
            disabled: true 
        },
        {
            icon: <LineShareIcon width="2rem" height="2rem"/>,
            title: 'Tiếp tục với LINE',
            disabled: true 
        },
        {
            icon: <KakaoTalkIcon/>,
            title: 'Tiếp tục với KakaoTalk',
            disabled: true 
        }
    ]

}


function LogFormModal() {
    
    const Context = useContext(ModalContext);
    
    const fromData = Context.isLoginFrom ? LOGIN_OPTIONS : SIGNUP_OPTIONS

    const [form, setForm] = useState(null);

    const handleCancle = () => {
        Context.handleHideModalLoginForm();
    }  

    const handleTypeForm = () => {
        Context.setIsLoginForm(!Context.isLoginFrom);
        Context.setIsPolicy(true);
        Context.setConvertForm(false);
    }

    const handleNextForm = (option) => {
        if(!!option.children) {
            Context.setConvertForm(true);
            setForm(option.children);

            if(option.children.title === 'Đăng nhập') {
                Context.setIsPolicy(false);
            }
        }
    }

    const handleBackForm = () => {
        Context.setConvertForm(false);
        Context.setIsPolicy(true);
    }

    return (
        <Fragment>
            { Context.activeLoginForm && Context.activeModal && 
                <Modal className={cx('wrapper')}>
                    <div className={cx('log-form-modal')}>
                        <div className={cx('log-form-container')}>
                            <div className={cx('log-form-content')}>
                                {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
                                { Context.convertForm ? (
                                    <Fragment>
                                        <div className={cx('back-btn')} onClick={handleBackForm}>
                                            <ArrowLeftIcon width="2.4rem" height="2.4rem" fill='rgb(22, 24, 35)'/>
                                        </div>
                                        {form.data}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <h2 className={cx('log-form-title')}>{fromData.title}</h2>
                                        <div className={cx('log-options')}>
                                            {
                                                fromData.data.map((option, index) => (
                                                    <Button key={index} className={cx('log-options-btn')} disabled={option.disabled} onClick={() => handleNextForm(option)}>
                                                        <p className={cx('options-icon')}>
                                                            {option.icon}
                                                        </p>
                                                        <p className={cx('options-title')}>{option.title}</p>
                                                    </Button>
                                                ))
                                            }
                                        </div>
                                    </Fragment>
                                ) }
                            </div>
                        </div>
                        { Context.isPolicy && <div className={cx('policy-confirm-tips')}>
                            <p className={cx('policy-text')}>
                                Bằng việc tiếp tục với tài khoản có vị trí tại
                                <Button to={''} className={cx('policy-link')}>Vietnam</Button>
                                , bạn đồng ý với
                                <Button to={''} className={cx('policy-link')}>Điều khoản Sử dụng</Button>
                                , đồng thời xác nhận rằng bạn đã đọc
                                <Button to={''} className={cx('policy-link')}>Chính sách Quyền riêng tư</Button>
                                của chúng tôi 
                            </p>
                        </div>}
                        <div className={cx('register-option')}>
                            <p className={cx('register-question')}>
                                { Context.isLoginFrom ? 'Bạn không có tài khoản?' : 'Bạn đã có tài khoản?'}
                            </p>
                            <Button className={cx('register-btn')} onClick={handleTypeForm}>
                            { Context.isLoginFrom ? 'Đăng ký' : 'Đăng nhập'}
                            </Button>
                        </div>
                    </div>
                    <div className={cx('close-btn')} onClick={handleCancle}>
                        <CloseModalIcon/>
                    </div>
                </Modal>
            }
        </Fragment>
    )
}

export default LogFormModal;
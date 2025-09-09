import { useEffect, useRef, useState, useContext } from "react";
import classNames from "classnames/bind";

import styles from "./SignupByEmail.module.scss";
import { CheckboxIcon, EyeIcon, LoadingLoginIcon, NoEyeIcon, WarnIcon } from "~/components/icons";

import { NotifyContext } from "~/components/Provider";

import * as authService from '~/Services/authService'

const cx = classNames.bind(styles);

function SignupByEmail() {
    const ContextNotify = useContext(NotifyContext);

    const passwordInputRef = useRef(null);
    const submitBtnRef = useRef(null);

    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [seePassword, setSeePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorSignup, setErrorSignup] = useState(false);

    useEffect(() => {
        if(!(valueEmail && valuePassword)) {
            submitBtnRef.current.setAttribute('disabled', true);
        }else {
            submitBtnRef.current.removeAttribute('disabled');
        }
    }, [valueEmail, valuePassword])

    const handleChangeEmail = (e) => {
        setValueEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setValuePassword(e.target.value);
    }

    const handleSeePassword = () => {
        passwordInputRef.current.type = passwordInputRef.current.type === 'password'? 'text' : 'password';
        passwordInputRef.current.setAttribute('type', passwordInputRef.current.type);
        if(passwordInputRef.current.type === 'text') {
            setSeePassword(true);
        }else {
            setSeePassword(false);
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if(!regex.test(valueEmail)) {
            setErrorSignup(true);
            return;
        }

        setIsLoading(true);
        const data = await authService.postSignup('email', valueEmail, valuePassword);

        if(!!data.data) {
            setErrorSignup(false);
            ContextNotify.setIsNotify(true);
            ContextNotify.setMessage('Đăng ký tài khoản thành công');

            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        } else {
            ContextNotify.setIsNotify(true);
            ContextNotify.setMessage('Có lỗi xảy ra. Đăng ký tài khoản không thành công');

            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        }
    }

    return (
        <div className={cx('wrapper')}>
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <h2 className={cx('title')}>Đăng ký</h2>
            <p className={cx('description')}>Email</p>
            <form>
                <div className={cx('input-container')}>
                    <input 
                        type="email" 
                        placeholder="Địa chỉ Email" 
                        value={valueEmail}
                        onChange={handleChangeEmail}
                        className={cx({
                            'error-email': errorSignup,
                        })}
                    />
                    { errorSignup && <div className={cx('password-icon')} onClick={handleSeePassword}>
                        <WarnIcon/>
                    </div> }
                </div>
                {errorSignup && <div className={cx('error-email')}>Email không hợp lệ</div>}
                <div className={cx('input-container')}>
                    <input 
                        ref={passwordInputRef}
                        type="password" 
                        placeholder="Mật khẩu" 
                        value={valuePassword}
                        onChange={handleChangePassword}
                    />
                    <div className={cx('password-icon')} onClick={handleSeePassword}>
                        { seePassword ? <EyeIcon/> : <NoEyeIcon/>}
                    </div>
                </div>
                <div className={cx('notify-to-email')}>
                    <div className={cx('checkbox-wrapper')}>
                        <input type="checkbox" id="checkbox-input"/>
                        <label htmlFor='checkbox-input' className={cx('label-checkbox')}>
                            <CheckboxIcon/>
                        </label>
                    </div>
                    <label htmlFor='checkbox-input' className={cx('checkbox-text')}>
                        Nhận nội dung thịnh hành, bản tin, khuyến mại, đề xuất và thông tin cập nhật tài khoản được gửi đến email của bạn
                    </label>
                </div>
                <button ref={submitBtnRef} className={cx('submit-btn')} onClick={handleSignup}>
                    { isLoading ? <LoadingLoginIcon/> : 'Đăng ký' }
                </button>
            </form>
        </div>
    )
}

export default SignupByEmail;
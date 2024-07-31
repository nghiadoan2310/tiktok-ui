import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./SignupByEmail.module.scss";
import { CheckboxIcon, EyeIcon, LoadingLoginIcon, NoEyeIcon } from "~/components/icons";
import * as authService from '~/Services/authService'

const cx = classNames.bind(styles);

function SignupByEmail() {

    const passwordInputRef = useRef(null);
    const submitBtnRef = useRef(null);

    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [seePassword, setSeePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSignup = async () => {

        setIsLoading(true);
        const data = await authService.postSignup('email', valueEmail, valuePassword)

        if(!!data) {
            alert('Đăng ký thành công')

            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        } else {
            alert('Đăng ký không thành công')

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
                    />
                </div>
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
                        <label for='checkbox-input' className={cx('label-checkbox')}>
                            <CheckboxIcon/>
                        </label>
                    </div>
                    <label for='checkbox-input' className={cx('checkbox-text')}>
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
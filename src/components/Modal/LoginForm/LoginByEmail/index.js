import { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./LoginByEmail.module.scss";
import Button from "~/components/Button";
import { EyeIcon, LoadingLoginIcon, NoEyeIcon, WarnIcon } from "~/components/icons";

import { NotifyContext } from "~/components/Provider";

import * as authService from '~/Services/authService'

const cx = classNames.bind(styles);

function LoginByEmail() {

    const ContextNotify = useContext(NotifyContext);

    const passwordInputRef = useRef(null);
    const submitBtnRef = useRef(null);

    const [valueEmail, setValueEmail] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [seePassword, setSeePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);

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

    const handleLogin = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const data = await authService.postLogin(valueEmail, valuePassword);

        if(!!data) {
            
            localStorage.setItem('token', JSON.stringify(`Bearer ${data.meta.token}`));
            localStorage.setItem('user_data', JSON.stringify(data.data));
            
            setTimeout(() => {
                setIsLoading(false);
                window.location.reload();
            }, 300)
            
            setErrorLogin(false)
            ContextNotify.setIsNotify(true);
            ContextNotify.setMessage('Đăng nhập thành công');
        } else {
            setErrorLogin(true)
            setTimeout(() => {
                setIsLoading(false);
            }, 300)
        }
    }

    const handlePressEnter = (e) => {
        if(e.key === 'Enter') {
            handleLogin(e);
        }
    }


    return (
        <div className={cx('wrapper')}>
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <h2 className={cx('title')}>Đăng nhập</h2>
            <p className={cx('description')}>Email hoặc TikTok ID</p>
            <form >
                <div className={cx('input-container')}>
                    <input 
                        type="email" 
                        placeholder="Email hoặc TikTok ID" 
                        value={valueEmail}
                        onChange={handleChangeEmail}
                        onKeyDown={handlePressEnter}
                    />
                </div>
                <div className={cx('input-container')}>
                    <input 
                        ref={passwordInputRef}
                        type="password" 
                        placeholder="Mật khẩu" 
                        value={valuePassword}
                        onChange={handleChangePassword}
                        onKeyDown={handlePressEnter}
                        className={cx({ 
                            'error': errorLogin
                        })}
                    />
                    <div className={cx('password-icon')} onClick={handleSeePassword}>
                        {errorLogin && <WarnIcon/>}
                        <div className={cx('show-hide-password')}>
                            { seePassword ? <EyeIcon/> : <NoEyeIcon/>}
                        </div>
                    </div>
                </div>
                {errorLogin && <div className={cx('error-login')}>Tài khoản hoặc mật khẩu không chính xác</div>}
                <Button className={cx('forget-password')}>Quên mật khẩu?</Button>
                <button ref={submitBtnRef} className={cx('submit-btn')} onClick={handleLogin}>
                    { isLoading ? <LoadingLoginIcon/> : 'Đăng nhập' }
                </button>
            </form>
        </div>
    )
}

export default LoginByEmail;
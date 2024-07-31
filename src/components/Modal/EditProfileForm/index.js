import { Fragment, useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from './EditProfileForm.module.scss';
import Modal from "..";

import { CloseIcon, EditAvatarIcon } from "~/components/icons";
import Button from "~/components/Button";
import images from "~/assets/img";

import * as authService from '~/Services/authService'

import { ModalContext } from "~/components/Provider";
import { AuthContext } from "~/components/Provider";
import { NotifyContext } from "~/components/Provider";

const cx = classNames.bind(styles);

function EditProfileForm() {
    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);
    const ContextNotify = useContext(NotifyContext);

    const inputChangeAvatarRef = useRef();
    const imgRef = useRef();

    const [bioValue, setBioValue] = useState(ContextAuth.userData.bio);
    const [firstnameValue, setFirstnameValue] = useState(ContextAuth.userData.first_name);
    const [lastnameValue, setLastnameValue] = useState(ContextAuth.userData.last_name);
    const [avatarValue, setAvatarValue] = useState();
    const [selectedAvatar, setSelectedAvatar] = useState(false);
    const [isChange, setIsChange] = useState(false);
 
    useEffect(() => {
        if(isChange) {
            if(bioValue.length > 0 && bioValue.length <= 80){
                setIsChange(true);
            } else {
                setIsChange(false);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bioValue])

    useEffect(() => {
        if(
            firstnameValue === ContextAuth.userData.first_name &&
            lastnameValue === ContextAuth.userData.last_name &&
            bioValue === ContextAuth.userData.bio
        ) {
            setIsChange(false);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [firstnameValue, lastnameValue, bioValue])

    useEffect(() => {
        if (!selectedAvatar) {
            return;
        }
    
        setAvatarValue(selectedAvatar);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAvatar])

    const handleChangeAvatar = () => {
        inputChangeAvatarRef.current.click();
    }

    const handleInputChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                setSelectedAvatar(e.target.result);               
            }
            reader.readAsDataURL(file);
            setIsChange(true);
        } else {
            setSelectedAvatar(false);
            setIsChange(false);
            return;
        }
    }

    const handleCancleEditFrom = (e) => {
        e.preventDefault();
        ContextModal.handleHideModalEditForm();
    }

    const handleErrorImage = () => {
        imgRef.current.setAttribute('src', images.noAvatar)
    }

    const handleChangeFirstname = (e) => {
        setFirstnameValue(e.target.value);
        setIsChange(true);
    }

    const handleChangeLastname = (e) => {
        setLastnameValue(e.target.value);
        setIsChange(true);
    }

    const handleChangeProfile = () => {

        const fetchApi = async () => {
            const result = await authService.patchUpdateCurrentUser(ContextAuth.tokenStr, avatarValue, firstnameValue, lastnameValue, bioValue);

            ContextNotify.setIsNotify(true);
            ContextNotify.setMessage('Hồ sơ đã được cập nhật');
            
            if(result) {
                localStorage.setItem('user_data', JSON.stringify(result.data));
                
                setTimeout(() => {
                    window.location.reload();
                }, 300);


            } else {
                ContextNotify.setIsNotify(true);
                ContextNotify.setMessage('Cập nhật hồ sơ thất bại');
            }
        }

        fetchApi();
    }

    return (
        <Fragment>
            { ContextModal.activeEditProfileForm && ContextModal.activeModal &&             
                <Modal>
                    <div className={cx('wrapper')}>
                        <form className={cx('edit-form-container')}>
                            <div className={cx('edit-form-header')}>
                                <h1 className={cx('edit-form-title')}>
                                    Sửa hồ sơ
                                </h1>
                                <div className={cx('close-form-btn')} onClick={handleCancleEditFrom}>
                                    <CloseIcon fill="rgba(22, 24, 35, .75)"/>
                                </div>
                            </div>
                            <div className={cx('edit-form-main')}>
                                <div className={cx('edit-form-item')}>
                                    <div className={cx('item-title')}>
                                        Ảnh hồ sơ
                                    </div>
                                    <div className={cx('edit-avatar')}>
                                        <label className={cx('edit-avatar-container')}>                                           
                                            <input 
                                                ref={inputChangeAvatarRef} 
                                                type="file" 
                                                accept="image/*"
                                                onChange={handleInputChangeAvatar}
                                            />
                                        </label>
                                        <div className={cx('edit-avatar-preview')}>                                            
                                            <img 
                                                ref={imgRef}
                                                src={!!selectedAvatar ? avatarValue : ContextAuth.userData.avatar}
                                                alt=""
                                                onClick={handleChangeAvatar}
                                                onError={handleErrorImage}
                                            />
                                        </div>
                                        <div className={cx('edit-avatar-upload-icon')} onClick={handleChangeAvatar}>
                                            <EditAvatarIcon/>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('edit-form-item')}>
                                    <div className={cx('item-title')}>
                                        Họ
                                    </div>
                                    <div className={cx('edit-username')}>
                                        <input 
                                            className={cx('text-input')} 
                                            placeholder="Nhập họ của bạn"
                                            onChange={handleChangeFirstname}
                                            value={firstnameValue}
                                        >
                                        </input>
                                        <p className={cx('edit-profile-user-link')}>
                                            www.tiktok.com/@nghiatd
                                        </p>
                                        <p className={cx('edit-profile-user-tip')}>
                                            TikTok ID chỉ có thể bao gồm chữ cái, chữ số, dấu gạch dưới và dấu chấm. 
                                            Khi thay đổi TikTok ID, liên kết hồ sơ của bạn cũng sẽ thay đổi. 
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('edit-form-item')}>
                                    <div className={cx('item-title')}>
                                            Tên
                                    </div>
                                    <div className={cx('edit-lastname')}>
                                        <input 
                                            className={cx('text-input')} 
                                            placeholder="Nhập tên của bạn"
                                            onChange={handleChangeLastname}
                                            value={lastnameValue}
                                        >
                                        </input>
                                        <p className={cx('edit-lastname-tip')}>
                                            Vui lòng nhập tên của bạn
                                        </p>
                                    </div>
                                </div>
                                <div className={cx('edit-form-item')}>
                                    <div className={cx('item-title')}>
                                            Tiểu sử
                                    </div>
                                    <div className={cx('edit-lastname')}>
                                        <textarea 
                                            className={cx('bio-input')} 
                                            placeholder="Tiểu sử"
                                            value={bioValue}
                                            onChange={(e) => {
                                                setBioValue(e.target.value);
                                                setIsChange(true);
                                            }}
                                        >
                                        </textarea>
                                        <p className={cx('text-count')}>
                                            {bioValue.length}/80
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('edit-form-footer')}>
                                <Button className={cx('cancel-btn')} onClick={handleCancleEditFrom}>Huỷ</Button>
                                <Button className={cx('save-btn')} disabled={!isChange} onClick={handleChangeProfile}>Lưu</Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
        </Fragment>
    )
}

export default EditProfileForm;
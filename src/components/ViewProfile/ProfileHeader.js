import { Fragment, useContext, useState, useEffect } from "react";
import classNames from "classnames/bind";

import styles from './ViewProfile.module.scss';
import Image from "../Image";
import { CheckIcon, EditProfileIcon, FollowedProfileIcon, LinkProfileIcon, MenuVideoIcon, ShareProfileIcon } from "../icons";
import Button from "../Button";

import * as followingService from '~/Services/followingService'

import { ModalContext } from "~/components/Provider";
import { AuthContext } from "~/components/Provider";
import Share from "../VideoActions/Share";

const cx = classNames.bind(styles);

function ProfileHeader({data = {}, currentUserProfile = false}) {

    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);

    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if(!data?.is_followed) {
            return;
        }
        setIsFollowed(data?.is_followed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    const handleFollowUser = async () => {
        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        } else if(ContextAuth.isCurrentUser && !isFollowed) {
            const result = await followingService.postFollowAnUser(ContextAuth.tokenStr, data.id);

            if(!!result) {
                setIsFollowed(true);
                console.log(result)
            }
        }
    }

    const handleUnFollowUser = async () => {
         if(ContextAuth.isCurrentUser && isFollowed) {
            const result = await followingService.postUnFollowAnUser(ContextAuth.tokenStr, data.id);

            if(!!result) {
                setIsFollowed(false);
                console.log(result)
            }
        }
    }

    const handleShowEditProfileForm = () => {
        ContextModal.handleShowModalEditForm();
        ContextModal.handleShowModal();
    }

    return (
        <div className={cx('profile-header')}>
            <div className={cx('user-info')}>
                <Image 
                    src={data.avatar}
                    className={cx('user-avatar')} 
                />
                <div className={cx('title-container')}>
                    <h1 className={cx('user-username')}>
                        <p>{data.nickname}</p>
                        {data.tick && <CheckIcon width="2rem" height="2rem"/>}
                    </h1>
                    <h2 className={cx('username')}>
                        {data.first_name} {data.last_name}
                    </h2>
                    {currentUserProfile ? 
                        (
                            <div className={cx('edit-profile-entrance')}>
                                <Button className={cx('edit-profile-btn')} onClick={handleShowEditProfileForm}>
                                    <EditProfileIcon/>
                                    <p>Sửa hồ sơ</p>
                                </Button>
                            </div>
                        ) : (
                            <div className={cx('follow-container')}>
                                {isFollowed ? (
                                    <Fragment>
                                        <Button className={cx('message-btn')}>Tin nhắn</Button>
                                        <div className={cx('unfollow-btn')} onClick={handleUnFollowUser}>
                                            <FollowedProfileIcon/>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Button className={cx('follow-btn')} onClick={handleFollowUser}>Follow</Button>
                                )}
                            </div>
                        )
                    }
                    </div>
            </div>
            <div className={cx('info-count')}>
                <div className={cx('count-container')}>
                    <strong className={cx('count-number')}>{data.followings_count}</strong>
                    <p className={cx('count-description')}>Đang Follow</p>
                </div>
                <div className={cx('count-container')}>
                    <strong className={cx('count-number')}>{data.followers_count}</strong>
                    <p className={cx('count-description')}>Follower</p>
                </div>
                <div className={cx('count-container')}>
                    <strong className={cx('count-number')}>{data.likes_count}</strong>
                    <p className={cx('count-description')}>Thích</p>
                </div>
            </div>
            <h2 className={cx('user-description')}>
                {data.bio?.length === 0 ? 'chưa có tiểu sử' : data.bio}
            </h2>
            <div className={cx('share-link')}>
                <LinkProfileIcon/>
                <p className={cx('link')}>www.facebook.com/{data.nickname}</p>
            </div>
            <div className={cx('btn-container')}>
                <Share>
                    <div className={cx('share-btn')}>
                        <ShareProfileIcon/>
                    </div>
                </Share>
                <div className={cx('menu-btn')}>
                    {!currentUserProfile && <MenuVideoIcon width="2.4rem" height="2.4rem"/>}
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader;
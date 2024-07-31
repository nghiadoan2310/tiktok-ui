import { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import config from '~/config';
import {
    ExploreIcon,
    ForyouIcon,
    LiveIcon,
    ProfileIcon,
    FollowingIcon,
    ForyouActiveIcon,
    ExploreActiveIcon,
    LiveActionIcon,
    FollowingActionIcon,
    FriendActionIcon,
    FriendIcon,
} from '~/components/icons';
import FollowingAccounts from '~/components/FollowingAccounts';

import * as followingService from '~/Services/followingService';
import Footer from './Footer';
import Button from '~/components/Button';
import { ModalContext } from "~/components/Provider";
import { AuthContext } from "~/components/Provider";

const cx = classNames.bind(styles);

function Sidebar() {

    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);

    const [followingUser, setFollowingUser] = useState([]);

    useEffect(() => {
        //Dùng axios
        const fetchApi = async () => {
            //result là giá trị trả về của việc tìm kiếm
            const result = await followingService.getFollowing(ContextAuth.tokenStr, 1);
            
            setFollowingUser(result);
        };

        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShowLoginForm = () => {
        ContextModal.handleShowModalLoginForm();
        ContextModal.handleShowModal();
    }

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title={'Dành cho bạn'}
                    to={config.routes.foryou}
                    icon={<ForyouIcon />}
                    activeIcon={<ForyouActiveIcon />}
                />
                <MenuItem
                    title={'Đang Follow'}
                    to={config.routes.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingActionIcon />}
                />
                <MenuItem
                    title={'Bạn bè'}
                    to={config.routes.friends}
                    icon={<FriendIcon />}
                    activeIcon={<FriendActionIcon />}
                />
                <MenuItem
                    title={'Khám phá'}
                    to={config.routes.explore}
                    icon={<ExploreIcon />}
                    activeIcon={<ExploreActiveIcon />}
                />
                <MenuItem title={'LIVE'} to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActionIcon />} />
                <MenuItem
                    title={'Hồ sơ'}
                    to={`/@${ContextAuth.userData.nickname}`}
                    icon={<ProfileIcon />}
                    currentUser={ContextAuth.isCurrentUser}
                />
            </Menu>

            { ContextAuth.isCurrentUser ? (
                <FollowingAccounts 
                    label={'Các tài khoản đang follow'} 
                    followed={followingUser.length === 0 ? false : true} 
                    data={followingUser} 
                />
            ) : (
                <div className={cx('frame-container')}>
                    <p className={cx('login-tip')}>
                        Đăng nhập để follow các tác giả, thích video và xem bình luận. 
                    </p>
                    <Button className={cx('login-btn')} onClick={handleShowLoginForm}>Đăng nhập</Button>
                </div>
            ) 
            }

            <Footer />
        </aside>
    );
}

export default Sidebar;

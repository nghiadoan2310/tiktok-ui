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
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(styles);

function Sidebar() {
    const { t } = useTranslation();
    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);

    const [followingUser, setFollowingUser] = useState([]);
    const [totalPageFollow, setTotalPageFollow] = useState(null);
    const [pageFollow, setPageFollow] = useState(1);
    const [isShowMore, setIsShowMore] = useState(true);

    useEffect(() => {
        //Dùng axios
        const fetchApi = async () => {
            //result là giá trị trả về của việc tìm kiếm
            const data = await followingService.getFollowing(ContextAuth.tokenStr, 1);
            
            if(data) {
                setTotalPageFollow(data.meta?.pagination?.total_pages);           
                    
                setFollowingUser(data.data);
            }
        };

        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!totalPageFollow || pageFollow > totalPageFollow || pageFollow === 1) {
            return;
        }

        if(pageFollow === totalPageFollow && followingUser?.length > 5) {
            setIsShowMore(false)
        } else {
            setIsShowMore(true)
        }

        //Dùng axios
        const fetchApi = async () => {
            //result là giá trị trả về của việc tìm kiếm
            const result = await followingService.getFollowing(ContextAuth.tokenStr, pageFollow);

            if(result) {
                setFollowingUser((prev) => [...prev,...result.data]);
            }           
        };

        fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageFollow]);

    useEffect(() => {
        if(totalPageFollow && pageFollow > totalPageFollow) {
            setPageFollow(1);
            setIsShowMore(true);

            const fetchApi = async () => {
                //result là giá trị trả về của việc tìm kiếm
                const result = await followingService.getFollowing(ContextAuth.tokenStr, 1);
    
                if(result) {
                    setFollowingUser(result.data);
                }           
            };
    
            fetchApi();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageFollow])

    const handleShowLoginForm = () => {
        ContextModal.handleShowModalLoginForm();
        ContextModal.handleShowModal();
    }

    const handleSeeMoreFollowingAccount = useCallback(() => {
        setPageFollow((prev) => prev + 1);
    }, [])

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem
                    title={t('For you')}
                    to={config.routes.foryou}
                    icon={<ForyouIcon />}
                    activeIcon={<ForyouActiveIcon />}
                />
                <MenuItem
                    title={t('Following')}
                    to={config.routes.following}
                    icon={<FollowingIcon />}
                    activeIcon={<FollowingActionIcon />}
                />
                <MenuItem
                    title={t('Friend')}
                    to={config.routes.friends}
                    icon={<FriendIcon />}
                    activeIcon={<FriendActionIcon />}
                />
                <MenuItem
                    title={t('Explore')}
                    to={config.routes.explore}
                    icon={<ExploreIcon />}
                    activeIcon={<ExploreActiveIcon />}
                />
                <MenuItem title={t('LIVE')} to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActionIcon />} />
                <MenuItem
                    title={t('Profile')}
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
                    onClickSeeMore={handleSeeMoreFollowingAccount}
                    showMoreBtn={isShowMore} 
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

import { Fragment, useContext } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus, 
    faEllipsisVertical, 
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import Menu from '~/components/Popper/Menu';
import { 
    CoinIcon, 
    CreatorIcon, 
    DarkmodeIcon, 
    FeedbackIcon, 
    HouseIcon, 
    KeyboardIcon, 
    LanguageIcon, 
    MailBox, 
    MessageIcon, 
    SettingIcon, 
    TiktokIcon, 
    UserIcon, 
    VideoIcon 
} from '~/components/icons';
import Image from '~/components/Image';
import Search from '../Search';
import config from '~/config';
import { ModalContext } from "~/components/Provider";
import { AuthContext } from '~/components/Provider';
import Button from '~/components/Button';
import i18n from "i18next";

const cx = classNames.bind(styles);


const handleChangelanguage = (title, code) => {
    localStorage.setItem("language", JSON.stringify({
        title,
        code
    }));
    i18n.changeLanguage(code).then(() => {
        window.location.reload();
    });
}

const language = JSON.parse(localStorage.getItem("language"));

const MENU_ITEMS = [
    {
        icon: <CreatorIcon/>,
        title: 'Trung tâm Nhà sáng tạo LIVE',
        to: '/live/creator'
    },
    {
        icon: <LanguageIcon/>,
        title: language.title,
        children: {
            title: 'Ngôn ngữ',
            data: [
                {
                    code: "en",
                    title: 'Tiếng Anh',
                    onClick: () => {
                        handleChangelanguage('Tiếng Anh', 'en');
                    }
                },
                {
                    code: "vi",
                    title: 'Tiếng Việt',
                    onClick: () => {
                        handleChangelanguage('Tiếng Việt', 'vi');
                    }                    
                }
            ]               
        }
    },
    {
        icon: <FeedbackIcon/>,
        title: 'Phản hồi và trợ giúp',
        to: '/feedback'
    },
    {
        icon: <KeyboardIcon/>,
        title: 'Phím tắt trên bàn phím'
    },
    {
        icon: <DarkmodeIcon/>,
        title: 'Chế độ tối',
        children: {
            title: "Chế độ tối",
            data: [
                {
                    code: "auto",
                    title: "Tự động",
                },
                {
                    code: "dark",
                    title: "Chế độ tối",
                },
                {
                    code: "light",
                    title: "Chế độ sáng",
                }
            ]
        }
    }
]

const NEW_MENU_ITEMS = MENU_ITEMS.slice(1, MENU_ITEMS.length);

const MENU_ACTION = [
    {
        icon: <UserIcon/>,
        title: 'Xem hồ sơ',
    },
    {
        icon: <CoinIcon/>,
        title: 'Nhận xu',
        to: '/coin'
    },
    {
        icon: <HouseIcon/>,
        title: 'Công cụ dành cho nhà sáng tạo',
        children: {
            title: 'Công cụ dành cho nhà sáng tạo',
            data: [
                {
                    icon: <VideoIcon/>,
                    title: 'LIVE Studio',
                    separate: true
                },
                {
                    icon: <CreatorIcon/>,
                    title: 'Trung tâm Nhà sáng tạo LIVE',
                    to: '/live/creator'                    
                }
            ]               
        }
    },
    {
        icon: <SettingIcon />,
        title: 'Cài đặt',
        to: '/setting'
    },
    ...NEW_MENU_ITEMS,
    // {
    //     icon: <FontAwesomeIcon icon={faArrowRightFromBracket}/>,
    //     title: 'Đăng xuất',
    //     separate: true
    // }
]

function Header() {
    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);
    
    const handleLogin = () => {
        ContextModal.handleShowModalLoginForm();
        ContextModal.handleShowModal();
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo')}>
                    <TiktokIcon />
                </Link>

                <Search />

                <div className={cx('action')}>
                    <Button className={cx('upload-btn')} to={'/upload'}>                       
                        <FontAwesomeIcon icon={faPlus} className={cx('upload-icon')} />
                        Tải lên                       
                    </Button>
                    { ContextAuth.isCurrentUser ? (
                        <Fragment>
                            <Tippy content='Tin nhắn' delay={[0,700]}>
                                <button className={cx('action-btn', 'action-btn-message')}>
                                    <MessageIcon></MessageIcon>
                                </button>
                            </Tippy>
                            <Tippy content='Hộp thư' delay={[0,700]}>
                                <button className={cx('action-btn')}>
                                    <MailBox width='3.2rem' height='3.2rem'></MailBox>
                                </button>
                            </Tippy>

                            <Menu
                                items = {MENU_ACTION}
                            >
                                <Image 
                                    src='https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-euttp/7310279064299208736~c5_100x100.jpeg?lk3s=a5d48078&nonce=14131&refresh_token=0ab86bb3d57bc13e1678e6ae677959b1&x-expires=1718442000&x-signature=5QwkRKsMduYiWMFaZGtB360hmMM%3D&shp=a5d48078&shcp=81f88b70'
                                    alt='avatar'
                                    className={cx('user-avatar')} 
                                />
                            </Menu>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <button className={cx('login-btn', 'primary')} onClick={handleLogin}>Đăng nhập</button>
        
                            <Menu
                                items = {MENU_ITEMS}
                            >
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />                                        
                                </button>
                            </Menu>
                        </Fragment>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;
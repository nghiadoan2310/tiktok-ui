import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '~/assets/img';
import FooterItem from './FooterItem';
import { Link } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Footer() {
    const FOOTER_ITEMS = [
        {
            title: 'Công ty',
            children: [
                {
                    title: 'Giới thiệu',
                    to: '/about',
                },
                {
                    title: 'Bảng tin',
                    to: '/about',
                },
                {
                    title: 'Liên hệ',
                    to: '/about',
                },
                {
                    title: 'Sự nghiệp',
                    to: '/about',
                }
            ],
        },
        {
            title: 'Chương trình',
            children: [
                {
                    title: 'TikTok for Good',
                    to: '/about',
                },
                {
                    title: 'Quảng cáo',
                    to: '/about',
                },
                {
                    title: 'TikTok LIVE Creator Networks',
                    to: '/about',
                },
                {
                    title: 'Deverlopers Minh bạch',
                    to: '/about',
                },
                {
                    title: 'Phần thưởng trên TikTok',
                    to: '/about',
                },
                {
                    title: 'TikTok Embeds',
                    to: '/about',
                }
            ],
        },
        {
            title: 'Điều khoản và chính sách',
            children: [
                {
                    title: 'Trợ giúp',
                    to: '/about',
                },
                {
                    title: 'An toàn',
                    to: '/about',
                },
                {
                    title: 'Điều khoản',
                    to: '/about',
                },
                {
                    title: 'Chính sách quyền riêng tư',
                    to: '/about',
                },
                {
                    title: 'Trung tâm quyền riêng tư',
                    to: '/about',
                },
                {
                    title: 'Creator Acedemy',
                    to: '/about',
                },
                {
                    title: 'Hướng dẫn Cộng đồng',
                    to: '/about',
                }
            ],
        },

    ];

    return (
        <div className={cx('footer')}>
            <div className={cx('banner')}>
                <a href="https://effecthouse.tiktok.com/download?utm_campaign=ttweb_entrance_v1&utm_source=tiktok_webapp_main">
                    <img src={images.bannerFooter} alt="banner-footer" className={cx('banner-img')}></img>
                    <p className={cx('banner-text')}>Tạo hiệu ứng Tiktok, nhận phần thưởng</p>
                </a>
            </div>
            <div className={cx('content')}>
                {
                    FOOTER_ITEMS.map((item, index) => {
                        return (
                            <FooterItem key={index} data={item}/>
                        )
                    })
                }
            </div>
            <Tippy 
                interactive
                offset={[-10, 14]}
                render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('popper-wrapper')}>
                            <Link className={cx('more-popper')}>NGUYÊN TẮC THỰC THI PHÁP LUẬT CỦA TIKTOK</Link>
                        </PopperWrapper>
                    </div>
                )}                
            >
                <p className={cx('more-link')}>Thêm</p>
            </Tippy>
            <p className={cx('copyright')}>© 2024 TikTok</p>
        </div>
    );
}

export default Footer;

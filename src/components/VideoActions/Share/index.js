import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import styles from './Share.module.scss'
import Button from "~/components/Button";
import { CopyLinkShareIcon, EmailShareIcon, EmbedShareIcon, FacebookShareIcon, FriendShareIcon, LineShareIcon, LinkedlnShareIcon, PinterestShareIcon, RedditShareIcon, ShowmoreShareIcon, TelegramShareIcon, TwitterShareIcon, WhatsAppShareIcon } from "~/components/icons";
import { Fragment, useState } from "react";

const cx = classNames.bind(styles);

const SHARE_ITEMS = [
    {
        icon: <EmbedShareIcon />,
        title: 'Nhúng',
        to: '/foryou#'
    },
    {
        icon: <FriendShareIcon />,
        title: 'Gửi đến bạn bè',
        to: '/foryou#'
    },
    {
        icon: <FacebookShareIcon />,
        title: 'Chia sẻ với Facebook',
        to: '/foryou#'
    },
    {
        icon: <WhatsAppShareIcon />,
        title: 'Chia sẻ với WhatsApp',
        to: '/foryou#'
    },
    {
        icon: <CopyLinkShareIcon />,
        title: 'Sao chép liên kết',
        to: '/foryou#'
    },
    {
        icon: <TwitterShareIcon />,
        title: 'Chia sẻ với Twitter',
        to: '/foryou#'
    },
    {
        icon: <LinkedlnShareIcon />,
        title: 'Chia sẻ với Linkedln',
        to: '/foryou#'
    },
    {
        icon: <RedditShareIcon/>,
        title: 'Chia sẻ với Reddit',
        to: '/foryou#'
    },
    {
        icon: <TelegramShareIcon/>,
        title: 'Chia sẻ với Telegram',
        to: '/foryou#'
    },
    {
        icon: <EmailShareIcon/>,
        title: 'Chia sẻ với Email',
        to: '/foryou#'
    },
    {
        icon: <LineShareIcon/>,
        title: 'Chia sẻ với Line',
        to: '/foryou#'
    },
    {
        icon: <PinterestShareIcon/>,
        title: 'Chia sẻ với Pinterest',
        to: '/foryou#'
    }
]

function Share({ children }) {

    const [isShowMore, setIsShowMore] = useState(false);

    const handleShowMore = () => {
        setIsShowMore(true)
    }

    return (
        <Tippy 
            interactive
            placement="top"
            delay={[0, 600]}
            offset={[90, 8]}
            hideOnClick={false}
            render={(attrs) => (
                <div className={cx('share-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('share-popper')}>
                        { isShowMore ? (
                            <Fragment>
                                {SHARE_ITEMS.map((item, index) => {
                                    return (
                                        <div className={cx('share-item')} key={index}>
                                            <Button className={cx('share-option')} to={item.to}>
                                                    {item.icon}
                                                    <span className={cx('share-title')}>{item.title}</span>
                                            </Button>
                                        </div>
                                    )
                                })}
                            </Fragment>
                        ) : (
                            <Fragment>
                                {SHARE_ITEMS.slice(0, 5).map((item, index) => {
                                    return (
                                        <div className={cx('share-item')} key={index}>
                                            <Button className={cx('share-option')} to={item.to}>
                                                    {item.icon}
                                                    <span className={cx('share-title')}>{item.title}</span>
                                            </Button>
                                        </div>
                                    )
                                })}
                                <button className={cx('more-btn')} onClick={handleShowMore}>
                                    <ShowmoreShareIcon/>
                                </button>
                            </Fragment>
                        )} 
                    </PopperWrapper>
                </div>
            )}
            
            onHide={() => {
                setIsShowMore(false);
              }}
        >
            {children}
        </Tippy>
    )
}

export default Share;
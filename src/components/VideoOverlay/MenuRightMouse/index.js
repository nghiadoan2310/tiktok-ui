import { useContext } from "react"
import classNames from "classnames/bind"

import styles from './MenuRightMouse.module.scss'
import { CopyLinkIcon, DownloadIcon, SeeDetailsIcon, SendToFriendIcon } from "~/components/icons"
import Button from "~/components/Button"
import { VideoContext } from "~/components/Provider"

const cx = classNames.bind(styles)

function MenuRightMouse() {

    const ContextVideo = useContext(VideoContext);

    const MENU_ITEMS = [
        {
            title: 'Tải về video',
            icon: <DownloadIcon />
        },
        {
            title: 'Gửi đến bạn bè',
            icon: <SendToFriendIcon />
        },
        {
            title: 'Sao chép liên kết',
            icon: <CopyLinkIcon />
        },
        {
            title: 'Xem chi tiết video',
            icon: <SeeDetailsIcon />
        }
    ]

    return (
        <div 
            className={cx('menu-list')} 
            style={{
                transform: `scale(${ContextVideo.isMenuRightMouse})`,
                left: ContextVideo.rightMouseX,
                top: ContextVideo.rightMouseY ,
            }}
        >
            {
                MENU_ITEMS.map((item, index) => (
                    <Button className={cx('menu-option')} key={index}>
                        <span className={cx('menu-icon')}>{item.icon}</span> 
                        <span className={cx('menu-title')}>{item.title}</span> 
                    </Button>
                ))
            }
        </div>
    )
}

export default MenuRightMouse
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import styles from './Menu.module.scss'
import Button from "~/components/Button";
import { AutoScrollIcon, NoCareIcon, ReportIcon } from "~/components/icons";

const cx = classNames.bind(styles);

function Menu({ children }) {

    const MENU_ITEMS = [
        {
            icon: <AutoScrollIcon />,
            title: 'Cuộn tự động',
        },
        {
            icon: <NoCareIcon />,
            title: 'Không quan tâm',
        },
        {
            icon: <ReportIcon />,
            title: 'Báo cáo',
        }
    ]

    return (
        <Tippy 
            interactive
            offset={[145, -120]}
            hideOnClick={false}
            render={(attrs) => (
                <div tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('video-top-popper')}>
                        {
                            MENU_ITEMS.map((item, index) => (
                                <div className={cx('video-top-item')} key={index}>
                                    <Button className={cx('video-top-option')}>
                                        {item.icon}
                                        <span className={cx('item-title')}>{item.title}</span>
                                    </Button>
                                </div>
                            ))
                        }
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    )
}

export default Menu;

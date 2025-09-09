import classNames from "classnames/bind";

import styles from "./VideoTop.module.scss"
import { MenuVideoIcon } from "~/components/icons";
import Menu from "./Menu";

const cx = classNames.bind(styles);

function VideoTop() {

    //Huỷ việc khi ấn vào element con thì dính onClick của element cha
    const handleRemoveClickParent = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={cx('wrapper')}>
            <Menu>
                <div className={cx('icon')} onClick={handleRemoveClickParent}>
                    <MenuVideoIcon/>
                </div>
            </Menu>
        </div>
    )
}

export default VideoTop

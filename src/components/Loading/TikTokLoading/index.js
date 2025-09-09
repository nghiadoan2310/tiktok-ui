import classNames from "classnames/bind";

import styles from "./TikTokLoading.module.scss";

const cx = classNames.bind(styles);

function TikTokLoading({className}) {
    return (
        <div className={cx("loading-container", className)}></div>
    );
}

export default TikTokLoading;
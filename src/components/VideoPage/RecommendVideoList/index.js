import { Fragment } from "react";
import classNames from "classnames/bind";

import styles from './RecommendVideoList.module.scss';
import { 
    ArrowLeftIcon, 
    ArrowRightIcon, 
} from "~/components/icons";
import RecommendVideoItem from "./RecommendVideoItem";

const cx = classNames.bind(styles)

function RecommendVideoList({data = []}) {

    const handleRemoveClickParent = (e) => {
        e.stopPropagation();
    }

    return (
        <Fragment>
        <div className={cx('background-end-video')} onClick={handleRemoveClickParent}></div>
        <div className={cx('recommend-video-list-container')} onClick={handleRemoveClickParent}>
            <div className={cx('recommend-prev-video-btn')}>
                <ArrowLeftIcon width="3.2rem" height="3.2rem"/>
            </div>
            <div className={cx('recommend-list-wrapper')}>
                {data.map((item, index) => (
                    <RecommendVideoItem key={index} item={item.videoData} index={item.position}/>
                ))}
            </div>
            <div className={cx('recommend-next-video-btn')}>
                <ArrowRightIcon width="3.2rem" height="3.2rem"/>
            </div>
        </div>
    </Fragment>
    )
}

export default RecommendVideoList;
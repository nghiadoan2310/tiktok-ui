import classNames from "classnames/bind";

import styles from "./VideoList.module.scss";
import VideoItem from "./VideoItem";

const cx = classNames.bind(styles);

function VideoList({data = [], setVideoId}) {
    return (
        <div className={cx('video-list-container')}>
            <p className={cx('video-list-title')}>Bạn có thể thích</p>
            <div className={cx('video-list-wrapper')}>
                {
                    data.map((item, index) => (
                        <VideoItem key={index} item={item} setVideoId={setVideoId} position={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoList;
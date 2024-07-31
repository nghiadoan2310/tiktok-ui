import { useEffect, useRef } from "react";
import classNames from "classnames/bind";

import styles from "./VideoProfileItem.module.scss";
import { LikeCountVideoIcon } from "~/components/icons";

const cx = classNames.bind(styles);

function VideoProfileItem({data = {}, index, setVideo=() => {}}) {
    const videoRef = useRef();

    useEffect(() => {
        if(index === 0) {
            setVideo(videoRef.current);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleMouseOverVideo = () => {
        setVideo(videoRef.current)
    }

    return (
        <section className={cx('video-user-item')} onContextMenu={(e) => e.preventDefault()}>
            <div className={cx('item-container')} onMouseOver={handleMouseOverVideo}>
                <div className={cx('video-container')}>
                    <video 
                        ref={videoRef} 
                        src={data.file_url} 
                        poster={data.thumb_url}
                        muted
                        loop
                    >
                    </video>
                    <div className={cx('bottom-container')}>
                        <LikeCountVideoIcon/>
                        <strong className={cx('Like-count')}>{data.likes_count}</strong>
                    </div>
                </div>
            </div>
            <div className={cx('description-container')}>
                <div className={cx('description-content')} title={data.description}>
                    <p>{data.description}</p>
                </div>
            </div>
        </section>
    );
}

export default VideoProfileItem;
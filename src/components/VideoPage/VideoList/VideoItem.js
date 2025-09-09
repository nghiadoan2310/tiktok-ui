import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { VideoContext } from "~/components/Provider";

import styles from "./VideoList.module.scss";
import { 
    CheckIcon,
    HeartCommentIcon,
    PlayingMaskVideoIcon
} from "~/components/icons";

const cx = classNames.bind(styles)

function VideoItem({item={}, setVideoId, position}) {
    const ContextVideo = useContext(VideoContext)

    const videoRef = useRef();

    const [totalTime, setTotalTime] = useState('');
    const [isPlayingNow, setIsPlayingNow] = useState(false)

    useEffect(() => {
        if(ContextVideo.videoId === item.id) {
            setIsPlayingNow(true)
        } else {
            setIsPlayingNow(false)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextVideo.videoId])

    useEffect(() => {
        const minute_string = item?.meta?.playtime_string?.split(':')[0]
        const minute = Number(minute_string);

        if(minute_string?.length === 1 && minute < 10) {
            setTotalTime(`0${item.meta?.playtime_string}`);
        } else {
            setTotalTime(item.meta?.playtime_string);
        }
    }, [item])

    const handleSeeVideo = () => {
        setVideoId(item.id);
    }

    useEffect(() => {
        const video = videoRef.current;

        const handleMouseOverVideo = () => {
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {}).catch((err) => {});
            }
        }

        const handleMouseOutVideo = () => {
            video.pause();
            video.load();
        }

        video.addEventListener('mouseover', handleMouseOverVideo);
        video.addEventListener('mouseout', handleMouseOutVideo);

        return () => {
            video.removeEventListener('mouseover', handleMouseOverVideo);
            video.removeEventListener('mouseout', handleMouseOutVideo);

            if(video) {
                video.pause();
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef.current])

    return (
        <div className={cx('video-item-container')}>
            <Link 
                to={`/@${item?.user?.nickname}/video/${item?.id}`} 
                className={cx('player-wrapper')} 
                onClick={handleSeeVideo}
            >
                <video 
                    ref={videoRef} 
                    src={item?.file_url}
                    poster={item?.thumb_url}
                    muted
                />
                { isPlayingNow &&            
                    <div className={cx('playing-mask-container')}>
                        <div className={cx('playing-mask-wrapper')}>
                            <PlayingMaskVideoIcon/>
                            <span className={cx('playing-mask-text')}>Hiện đang phát</span>
                        </div>
                    </div> 
                }
                <div className={cx('duration')}>{totalTime}</div>
            </Link>
            <div className={cx('info-wrapper')}>
                <div className={cx('desc')}>
                    {item?.description}
                </div>
                <div className={cx('author')}>
                    <span>{item?.user?.nickname}</span>
                    {item?.user?.tick && <CheckIcon width="1rem" height="1rem"/>}
                </div>
                <div className={cx('other-info')}>
                    <div className={cx('heart-info')}>
                        <HeartCommentIcon width="1.6rem" height="1.6rem"/>
                        <span className={cx('heart-count')}>{item?.likes_count}</span>
                    </div>
                    <span>.</span>
                    {item?.updated_at?.split(' ')[0]}
                </div>
            </div>
        </div>
    );
}

export default VideoItem;
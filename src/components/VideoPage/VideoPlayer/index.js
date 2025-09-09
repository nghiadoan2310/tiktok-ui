import { useEffect, useState, useContext, useRef } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import classNames from "classnames/bind"

import styles from './VideoPlayer.module.scss'
import { 
    ArrowLeftIcon, 
    ArrowRightIcon, 
    CommentIcon, 
    FavoriteVideoIcon, 
    HeartIcon, 
    ShareIcon, 
    PlayVideotIcon, 
    MiniVideotIcon,
    MutevideoIcon,
    FullScreenIcon,
    MenuVideoIcon,
    AutoScrollIcon,
    PauseVideotIcon,
    AudiovideoIcon,
    ReloadVideoIcon,
    CheckboxIcon,
} from "~/components/icons";
import RecommendVideoList from "../RecommendVideoList";

import { VideoContext } from "~/components/Provider";

const cx = classNames.bind(styles)

const SPEED_OPTIONS = [
    {
        title: '0.75x',
        value: 0.75,
        selected: false,
    },
    {
        title: '1.0x',
        value: 1,
        selected: true,
    },
    {
        title: '1.25x',
        value: 1.25,
        selected: false,
    },
    {
        title: '1.5x',
        value: 1.5,
        selected: false,
    },
    {
        title: '2x',
        value: 2,
        selected: false,
    }
]

function VideoPlayer({ videoItem = {}, recommendVideoList = [] }) {

    const ContextVideo = useContext(VideoContext);

    const videoRef = useRef();
    const intervalRef = useRef();
    const timeRef = useRef();

    const [totalTime, setTotalTime] = useState('00');
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00')
    const [isVideoEnd, setIsVideoEnd] = useState(false);
    const [isPlayPauseAnimation, setIsPlayPauseAnimation] = useState(false)

    useEffect(() => {

        if(ContextVideo.isChangeState) {
            window.history.replaceState(null, '', `/@${ContextVideo.videoUsername}/video/${ContextVideo.videoId}`);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextVideo.videoId, ContextVideo.videoUsername])

    useEffect(() => {
        const minute_string = videoItem?.meta?.playtime_string?.split(':')[0]
        const minute = Number(minute_string);

        if(minute_string?.length === 1 && minute < 10) {
            setTotalTime(`0${videoItem?.meta?.playtime_string}`);
        } else {
            setTotalTime(videoItem?.meta?.playtime_string);
        }
    }, [videoItem])

    const handlePlayPauseVideo = () => {
        setIsPlaying(!isPlaying);
        setIsPlayPauseAnimation(true);

        setTimeout(() => {
            setIsPlayPauseAnimation(false);
        }, 600);
    }
    
    useEffect(() => {
        const video = videoRef.current;
        if(isPlaying) {
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {}).catch((error) => {});
            }
        } else {
            video.pause();
        }

    }, [isPlaying])

    const handleRemoveClickParent = (e) => {
        e.stopPropagation();
    }

    const handleSeekbarChange = (e) => {
        const value = Number(e.target.value);
        const video = videoRef.current;
        video.currentTime = (value * videoRef.current.duration) / 100;
    };

    useEffect(() => {
        const updateProgress = () => {
            const value = !!((videoRef.current.currentTime / videoRef.current.duration) * 100) ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0;
            setProgress(value);
        };

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    
        intervalRef.current = setInterval(updateProgress, 100);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef.current])

    useEffect(() => {
        const updateTime = () => {
            const minutes = Math.floor(videoRef.current.currentTime / 60);
            const seconds = Math.round(videoRef.current.currentTime % 60);

            setCurrentTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
            
        };

        if (timeRef.current) {
            clearInterval(timeRef.current);
        }
    
        timeRef.current = setInterval(updateTime, 1000);

        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current);
                timeRef.current = null;
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef.current])

    useEffect(() => {
        if(videoRef.current.currentTime === videoRef.current.duration) {
            setIsVideoEnd(true);
        } else {
            setIsVideoEnd(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef?.current?.currentTime])

    const handleChangeVolume = (e) => {
        ContextVideo.setValueVolume(e.target.value);
    }

    useEffect(() => {
        if(ContextVideo.mutedVideo) {
            videoRef.current.volume = 0;
        }
    }, [ContextVideo.mutedVideo]);

    useEffect(() => {
        videoRef.current.playbackRate = 1;
    }, [])

    const handleMuteVideo = (e) => {
        if (ContextVideo.mutedVideo) {
            ContextVideo.setMutedVideo(false);
            videoRef.current.volume = 0.5;
            ContextVideo.setValueVolume(0.5);
        } else {
            ContextVideo.setMutedVideo(true);
            videoRef.current.volume = 0;
            ContextVideo.setValueVolume(0);
        }
    };

    useEffect(() => {
        if (ContextVideo.valueVolume > 0) {
            videoRef.current.volume = ContextVideo.valueVolume
            ContextVideo.setMutedVideo(false);
        } else {
            ContextVideo.setMutedVideo(true);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextVideo.valueVolume])

    const handleReloadVideo = () => {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
    }
    
    const handleChangeSpeedVideo = (item, index) => {
        videoRef.current.playbackRate = item.value;
        // eslint-disable-next-line array-callback-return
        SPEED_OPTIONS.forEach((speed_item, speed_index) => {
            if(speed_index === index) {
                item.selected = true;
            } else {
                speed_item.selected = false;
            }
        })
    }

    return (
        <div className={cx('video-container')} onClick={handlePlayPauseVideo}>
            <div className={cx('blur-background-container')}>
                <div className={cx('blur-background-wrapper')}>
                    <img 
                        src={videoItem?.thumb_url} 
                        alt="" 
                        className={cx('blur-background')}/>
                </div>
            </div>
            <div className={cx('video-wrapper')}>
                <video
                    ref={videoRef} 
                    src={videoItem?.file_url} 
                    poster={videoItem?.thumb_url}
                    autoPlay
                />
            </div>
            {isPlayPauseAnimation && <div className={cx('play-pause-animation-wrapper')}>
                <div className={cx('play-pause-animation-container')}>
                    {isPlaying ? (
                        <PauseVideotIcon width="8.8rem" height="8.8rem"/>
                    ) : (
                        <PlayVideotIcon width="8.8rem" height="8.8rem"/>
                    )}
                </div>
            </div>}
            <div className={cx('video-action-bar')}>
                <div className={cx('video-switch-wrapper')}>
                    <button className={cx('prev-video-btn')}>
                        <ArrowLeftIcon width="2rem" height="2rem"/>
                    </button>
                    <button className={cx('next-video-btn')}>
                        <ArrowRightIcon width="2rem" height="2rem"/>
                    </button>
                </div>
                <div className={cx('video-action')}>
                    <button className={cx('video-action-btn')}>
                        <div className={cx('video-action-icon')}>                                            
                            <HeartIcon />
                        </div>
                        <span className={cx('action-count')}>{videoItem?.likes_count}</span>
                    </button>
                    <button className={cx('video-action-btn')}>
                        <div className={cx('video-action-icon')}>                                            
                            <CommentIcon />
                        </div>
                        <span className={cx('action-count')}>{videoItem?.comments_count}</span>
                    </button>
                    <button className={cx('video-action-btn')}>
                        <div className={cx('video-action-icon')}>                                            
                            <FavoriteVideoIcon />
                        </div>
                        <span className={cx('action-count')}>{videoItem?.shares_count}</span>
                    </button>
                    <button className={cx('video-action-btn')}>
                        <div className={cx('video-action-icon')}>                                            
                            <ShareIcon />
                        </div>
                        <span className={cx('action-count')}>{videoItem?.shares_count}</span>
                    </button>
                </div>
            </div>

            { isVideoEnd && <RecommendVideoList data={recommendVideoList}/>}

            <div className={cx('video-control-container')} onClick={handleRemoveClickParent}>
                <div className={cx('seekbar-container')}>
                    <input
                        type="range"
                        className={cx('slider')}
                        min="0"
                        max="100"
                        onChange={handleSeekbarChange}
                        value={progress}
                    ></input>
                    {/* <div className={cx('seebar-circle')}></div> */}
                    <div
                        className={cx('seekbar')}
                        style={{
                            transform: `scaleX(${progress/100}) translateY(-50%)`,
                        }}
                    ></div>
                </div>
                <div className={cx('video-control-wrapper')}>
                    <div className={cx('left-control')}>
                        {isVideoEnd ? (
                            <div className={cx('control-icon')} onClick={handleReloadVideo}>
                                <ReloadVideoIcon/>
                            </div>
                        ) : (
                            <div className={cx('control-icon')} onClick={handlePlayPauseVideo}>
                                {isPlaying ? <PauseVideotIcon /> : <PlayVideotIcon />}
                            </div>
                        )}
                        <div className={cx('seekbar-time')}>
                            <div className={cx('seekbar-time-item')}>{currentTime}</div>
                            <div className={cx('separation')}>/</div>
                            <div className={cx('seekbar-time-item')}>{totalTime}</div>
                        </div>
                    </div>
                    <div className={cx('right-control')}>
                        <div className={cx('control-icon')}>
                            <MiniVideotIcon />
                        </div>
                        <div className={cx('control-icon')}>
                            <AutoScrollIcon />
                        </div>
                        <div>
                            <HeadlessTippy 
                                interactive //tương tác
                                offset={[0, 22]}
                                //Hiển thị
                                render={(attrs) => (
                                    <div className={cx("speed-list-container")} tabIndex="-1" {...attrs}>
                                        { SPEED_OPTIONS.map((item, index) => (
                                            <div 
                                                key={index}
                                                className={cx("speed-item")} 
                                                onClick={() => handleChangeSpeedVideo(item, index)}
                                            >
                                                {item.selected && <CheckboxIcon width="1.6rem" height="1.6rem"/>}
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            >
                                <div className={cx('speed-wrapper')}>Tốc độ</div>
                            </HeadlessTippy>
                        </div>
                        <div className={cx('control-icon', 'audio-icon')} onClick={handleMuteVideo}>
                            {ContextVideo.mutedVideo ? <MutevideoIcon/> : <AudiovideoIcon/>}
                        </div>
                        <div className={cx('volume-control-container')} onClick={handleRemoveClickParent}>
                            <div className={cx('volume-control-wrapper')}>
                                <input 
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.02"
                                    className={cx('volume-input')}
                                    value={ContextVideo.valueVolume}
                                    onChange={handleChangeVolume}
                                />
                                <div 
                                    className={cx('volume-seekbar')}
                                    style={{ transform: `scaleX(${ContextVideo.valueVolume})` }}
                                ></div>
                            </div>
                        </div>
                        <div className={cx('control-icon')}>
                            <FullScreenIcon />
                        </div>
                        <div className={cx('control-icon')}>
                            <MenuVideoIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer;
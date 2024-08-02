/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useRef, useEffect, useContext, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';

import { VideoContext } from '../Provider';

import styles from './VideoItem.module.scss';
import VideoActions from '../VideoActions';
import VideoBottom from '~/components/VideoOverlay/VideoBottom';
import VideoTop from '~/components/VideoOverlay/VideoTop';
import {
    AudiovideoIcon,
    MiniVideotIcon,
    MutevideoIcon,
    PauseVideotIcon,
    PlayVideotIcon,
    UnAutoScrollIcon,
} from '~/components/icons';
import TikTokLoading from '../Loading/TikTokLoading';

const cx = classNames.bind(styles);

function VideoItem({ 
    item, 
    index,
    currentVideo = () => {},
    inView = false,
    onInview,
}) {
    const [inViewRef, isInView] = useInView({
        root: null,
        rootMargin: '20px',
        threshold: 0.47,
    });

    const ContextVideo = useContext(VideoContext);

    const videoRef = useRef(null);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [seekbar, setSeekbar] = useState(0);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if(ContextVideo.mutedVideo) {
            videoRef.current.volume = 0;
        }
    }, [ContextVideo.mutedVideo]);

    useEffect(() => {
        if(inView && !ContextVideo.showDetailVideo) {
            const playPromise = videoRef.current.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {}).catch((error) => {});
            }
            
            setIsPlaying(true);

        } else {
            setIsPlaying(false);
            videoRef.current.pause();
        }

    }, [inView, ContextVideo.showDetailVideo])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsPlaying(false);
                videoRef.current.pause();
            } else {             
                if(inView && !ContextVideo.showDetailVideo) {
                    const playPromise = videoRef.current.play();

                    if (playPromise !== undefined) {
                        playPromise.then(() => {}).catch((error) => {});
                    }

                    setIsPlaying(true);
                }
            }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, ContextVideo.showDetailVideo]);

    useLayoutEffect(() => {
        updateInViewList(isInView, index)
        isInView ? currentVideo(index) : handleReloadVideo();
    }, [isInView])

    const updateInViewList = (inView, position) => {
        ContextVideo.isInViewVideoList[position].updateInview(inView);
        onInview(inView)
    };

    const handleReloadVideo = () => {
        setIsPlaying(false);
        videoRef.current.load();
    }

    //Huỷ việc khi ấn vào element con thì dính onClick của element cha (onClick thẻ cha chuyển đến trang khác)
    const handleRemoveClickParent = (e) => {
        e.stopPropagation();
    }

    const handleRightMouseClick = (e) => {
        e.preventDefault();

        ContextVideo.setIsMenuRightMouse(1);
        ContextVideo.setRightMouseX(e.clientX);
        ContextVideo.setRightMouseY(e.clientY);
    };

    const handlePlayPause = (e) => {
        e.stopPropagation();
        if (isPlaying) {
            updateInViewList(false, index)
            setIsPlaying(false);
            videoRef.current.pause();
        } else {
            updateInViewList(true, index)
            setIsPlaying(true);
            videoRef.current.play();           
        }
    };

    useEffect(() => {
        const updateProgress = () => {
            const value = !!((videoRef.current.currentTime / videoRef.current.duration) * 100) ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0;
            setProgress(value);
            setSeekbar(value / 100);
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

    const handleSeekbarChange = (e) => {
        const value = Number(sliderRef.current.value);
        setSeekbar(value / 100);
        videoRef.current.currentTime = (value * videoRef.current.duration) / 100;
    };

    const handleChangeVolume = (e) => {
        ContextVideo.setValueVolume(e.target.value);
    };

    useEffect(() => {
        if (ContextVideo.valueVolume > 0) {
            videoRef.current.volume = ContextVideo.valueVolume
            ContextVideo.setMutedVideo(false);
        } else {
            ContextVideo.setMutedVideo(true);
        }

    }, [ContextVideo.valueVolume])

    const handleMuteVideo = (e) => {
        e.stopPropagation();
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

    //xem chi tiết video
    const handleViewDetail = () => {
        videoRef.current.pause();
        ContextVideo.setVideoId(item.id);
        ContextVideo.setPositionVideo(index);
        ContextVideo.setLocationPathname(window.location.pathname);
        ContextVideo.handleShowDetailVideo();
    }

    useEffect(() => {
        if(!ContextVideo.showDetailVideo && ContextVideo.positionVideo === index) {
            videoRef.current.currentTime=0;
            const playPromise = videoRef.current.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {}).catch((error) => {});
            }

            setIsPlaying(true);
        }

    }, [ContextVideo.showDetailVideo])

    //lắng nghe sự kiện chuột để ẩn menu khi nhấn chuột phải vào video
    useEffect(() => {
        const handleScroll = () => {
            ContextVideo.setIsMenuRightMouse(0);
        };

        const handleClick = () => {
            ContextVideo.setIsMenuRightMouse(0);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleClick);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <div ref={inViewRef} className={cx('video-view')} onContextMenu={handleRightMouseClick} onClick={handleViewDetail}>
                { isPlaying && isLoading && 
                    <div className={cx('loading-video')}>
                        <TikTokLoading/>
                    </div>
                }
                <div className={cx('video-player')}>
                    <video
                        ref={videoRef}
                        src={item.file_url}
                        poster={item.thumb_url}
                        style={{ width: '100%', height: '100%' }}
                        loop
                        onPlaying={() => { setIsLoading(false) }}
                        onWaiting={() => { setIsLoading(true) }}
                    ></video>
                </div>
                <div className={cx('video-top')}>
                    <VideoTop />
                </div>
                <div className={cx('video-bottom')}>
                    <VideoBottom data={item} />
                    <div className={cx('control')}>
                        <div className={cx('play-icon')} onClick={handlePlayPause}>
                            {isPlaying ? <PauseVideotIcon /> : <PlayVideotIcon />}
                        </div>
                        <div className={cx('seekbar-container')} onClick={handleRemoveClickParent}>
                            <input
                                ref={sliderRef}
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
                                    transform: `scaleX(${seekbar}) translateY(-50%)`,
                                }}
                            ></div>
                        </div>
                        <div className={cx('control-right')}>
                            <div className={cx('mini-play-icon')}>
                                <MiniVideotIcon />
                            </div>
                            <div className={cx('auto-scroll')}>
                                <UnAutoScrollIcon />
                            </div>
                            <div className={cx('audio-icon')} onClick={handleMuteVideo}>
                                {ContextVideo.mutedVideo ? <MutevideoIcon /> : <AudiovideoIcon />}
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
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('video-actions')}>
                <VideoActions data={item} />
            </div>
        </Fragment>
    );
}

export default VideoItem;

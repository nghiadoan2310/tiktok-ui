import { Fragment, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './VideosSuggested.module.scss';
import VideoItem from '../VideoItem';
import { VideoContext } from "../Provider";

const cx = classNames.bind(styles);

function VideosSuggested({ data = [] }) {
    const ContextVideo = useContext(VideoContext);

    const videoListRef = useRef();

    const [positionCurrentVideo, setPositionCurrentVideo] = useState(0);
    const [positionInview, setPositionInview] = useState(0);
    const [onInview, setOnInview] = useState(false);
    const [isKeyDown, setIsKeyDown] = useState(false);

    useEffect(() => {
        ContextVideo.setPositionVideo(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setPositionCurrentVideo(ContextVideo.positionVideo);

    }, [ContextVideo.positionVideo])

    useLayoutEffect(() => {
        if(ContextVideo.showDetailVideo || isKeyDown) {
            ContextVideo.isInViewVideoList.forEach((video, index) => {
                video.updateInview(index === positionCurrentVideo);
            })
            handleKeyDownElement(positionCurrentVideo);
            setIsKeyDown(false);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isKeyDown, positionCurrentVideo])

    useEffect(() => {
        const handleKeyDown = (e) => {
            const ARROW_UP = 38;
            const ARROW_DOWN = 40;
            if(e.keyCode === ARROW_UP) {
                e.preventDefault();
                setIsKeyDown(true);
                setPositionCurrentVideo(prev =>   prev === 0 ? 0 : prev - 1 )
                
            } else if(e.keyCode === ARROW_DOWN) {
                e.preventDefault();
                setIsKeyDown(true);
                setPositionCurrentVideo(prev =>  prev + 1 )
            }

        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    useEffect(() => {
        const positionFisrtVideoInView = ContextVideo.isInViewVideoList.findIndex((video) => video?.inView === true);
        setPositionInview(positionFisrtVideoInView);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onInview, positionCurrentVideo])

    const handleSetCurrentVideo = useCallback((position) => {
        setPositionCurrentVideo(position);
    }, [])

    const handleKeyDownElement = (position) => {
        videoListRef.current?.childNodes[position]?.scrollIntoView({
            behavior: 'smooth',
        });
    }

    const handleSetOnInview = (isInview) => {
        setOnInview(isInview);
    }

    return (
        <div ref={videoListRef} className={cx('list-video')}>
            {data.map((item, index) => (
                <Fragment key={index}>
                    {item.meta.video.resolution_x < item.meta.video.resolution_y ? (
                        <div className={cx('video-item')} shape="vertical">
                            <VideoItem 
                                item = {item} 
                                index = {index}
                                currentVideo = {handleSetCurrentVideo}
                                inView = {index === positionInview}
                                onInview = {handleSetOnInview}   
                            />
                        </div>
                    ) : (
                        <div className={cx('video-item')} shape="horizontal">
                            <VideoItem 
                                item = {item} 
                                index={index}
                                currentVideo = {handleSetCurrentVideo}
                                inView = {index === positionInview}
                                onInview = {handleSetOnInview}  
                            />
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
}

export default VideosSuggested;

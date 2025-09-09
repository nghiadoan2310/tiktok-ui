import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Helmet } from "react-helmet";

import * as videoService from '~/Services/videoService'
import * as commentService from '~/Services/commentService'

import { AuthContext } from "../Provider";
import { ModalContext } from "../Provider";
import { NotifyContext } from "../Provider";
import { VideoContext } from "../Provider";

import styles from "./VideoDetail.module.scss";
import Button from "../Button";
import { 
    ArrowLeftIcon, 
    ArrowRightIcon, 
    AudiovideoIcon, 
    AutoScrollIcon, 
    CheckIcon, 
    CloseIcon, 
    CommentIcon, 
    EmbedShareIcon, 
    FacebookShareIcon, 
    FavoriteVideoIcon, 
    FriendShareIcon, 
    HeartIcon, 
    LikeCountVideoIcon, 
    MenuVideoIcon, 
    MiniVideotIcon, 
    MusicIcon, 
    MutevideoIcon, 
    PlayVideotIcon, 
    SearchIcon, 
    ShareIcon, 
    TwitterShareIcon, 
    WhatsAppShareIcon 
} from "../icons";
import ListComment from "../ListComments";
import Image from "../Image";
import InputCommment from "../InputCommment";

const cx = classNames.bind(styles);

function VideoDetail() {
    const ContextVideo = useContext(VideoContext);
    const ContextAuth = useContext(AuthContext);
    const ContextModal = useContext(ModalContext);
    const ContextNotify = useContext(NotifyContext);

    const navigate = useNavigate();

    const videoRef = useRef();
    const commentTabRef = useRef();
    const userVideoRef = useRef();
    const linkVideoRef = useRef();
    const CommentInputRef = useRef();
    const intervalRef = useRef();
    const timeRef = useRef();

    const [videoItem, setVideoItem] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [commentInputValue, setCommentInputValue] = useState('');
    const [isCommentInputValue, setIsCommentInputValue] = useState(false);
    const [isCommentTab, setIsCommentTab] = useState();
    const [totalTime, setTotalTime] = useState('00');
    const [isPlaying, setIsPlaying] = useState(true);
    const [seekbar, setSeekbar] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [nextVideo, setNextVideo] = useState(false);
    const [prevVideo, setPrevVideo] = useState(false);

    useEffect(() => {
        const videoId = ContextVideo.listVideo[ContextVideo.positionVideo]?.id;

        const nicknameUser = ContextVideo.listVideo[ContextVideo.positionVideo]?.user.nickname;
        if(videoId) {
            window.history.replaceState(null, '', `/@${nicknameUser}/video/${videoId}`);
        }

    }, [ContextVideo.positionVideo, ContextVideo.listVideo])

    useEffect(() => {
        const videoId = ContextVideo.listVideo[ContextVideo.positionVideo]?.id;

        const fetchApi = async () => {
            //result là giá trị trả về của việc tìm kiếm
            const result_video = await videoService.getAVideo( videoId ?? window.location.pathname.split('/')[3]);
            const result_comment_list = await commentService.getComment(ContextAuth.tokenStr, videoId ?? window.location.pathname.split('/')[3]);

            setVideoItem(result_video);
            setCommentList(result_comment_list);
        }

        fetchApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextVideo.positionVideo, ContextVideo.listVideo])

    useEffect(() => {
        const minute_string = videoItem?.meta?.playtime_string?.split(':')[0]
        const minute = Number(minute_string);

        if(minute_string?.length === 1 && minute < 10) {
            setTotalTime(`0${videoItem?.meta?.playtime_string}`);
        } else {
            setTotalTime(videoItem?.meta?.playtime_string);
        }
    }, [videoItem])

    useEffect(() => {
        commentTabRef.current.setAttribute('active', true);
        setIsCommentTab(true);
    }, [])

    useEffect(() => {
        if(!!commentInputValue && ContextAuth.isCurrentUser) {
            setIsCommentInputValue(false)
        }else if(!commentInputValue && ContextAuth.isCurrentUser){
            setIsCommentInputValue(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentInputValue])

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

    //khi focus vào ô bình luận trên thanh tab 
    const handleComment = () => {
        commentTabRef.current.setAttribute('active', true);
        userVideoRef.current.removeAttribute('active');
        setIsCommentTab(true)
    }

    //khi focus vào ô video nhà sáng tạo trên thanh tab 
    const handleUserVideo = () => {
        commentTabRef.current.removeAttribute('active');
        userVideoRef.current.setAttribute('active', true);
        setIsCommentTab(false)
    }

    //Khi có thay đổi trên thanh input comment (khi người dùng nhập vào)
    const handleChangeInputComment = (e) => {
        setCommentInputValue(e.target.value);
    }

    const handlePostComment = async () => {
        const videoId = ContextVideo.listVideo[ContextVideo.positionVideo]?.id;

        const data = await commentService.postComment(ContextAuth.tokenStr, videoId ?? window.location.pathname.split('/')[3], commentInputValue)
        if(!!data) {
            ContextNotify.setIsNotify(true);
            ContextNotify.setMessage('Đã đăng bình luận');

            setTimeout(() => {
                setCommentInputValue('')
                setCommentList([...commentList, data])
                videoItem.comments_count++;
            }, 300);
        }else {
            ContextNotify.setIsNotify(true);
            ContextNotify.setMessage('Xảy ra lỗi. Bình luận không thành công');

            setTimeout(() => {
                setCommentInputValue('')
            }, 300);
        }
    }

    //Khi nhấn vào nút đóng xem chi tiết video
    const handleCloseDetailVideo = () => {
        ContextVideo.setShowDetailVideo(false);
        navigate(ContextVideo.locationPathname)
        document.body.style.overflowY = 'auto';
    }

    //Xử lý khi nhấn nút chia sẻ liên kết
    const handleCopyLink = () => {
        ContextNotify.setIsNotify(true);
        ContextNotify.setMessage('Đã sao chép');
        navigator.clipboard.writeText(linkVideoRef.current.innerText);
    }

    const handleLogin = () => {
        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        }
    }

    const handlePlayPauseVideo = () => {
        setIsPlaying(!isPlaying)
    }

    const handleSeekbarChange = (e) => {
        const value = Number(e.target.value);
        setSeekbar(value / 100);
        videoRef.current.currentTime = (value * videoRef.current.duration) / 100;
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

    const handleChangeVolume = (e) => {
        ContextVideo.setValueVolume(e.target.value);
    }

    useEffect(() => {
        if(ContextVideo.mutedVideo) {
            videoRef.current.volume = 0;
        }
    }, [ContextVideo.mutedVideo]);

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

    useEffect(() => {
        if (ContextVideo.valueVolume > 0) {
            videoRef.current.volume = ContextVideo.valueVolume
            ContextVideo.setMutedVideo(false);
        } else {
            ContextVideo.setMutedVideo(true);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextVideo.valueVolume])

    const handleSeePrevVideo = (e) => {
        e.stopPropagation();
        setPrevVideo(true);
    }
    
    const handleSeeNextVideo = (e) => {
        e.stopPropagation();
        setNextVideo(true);
    }

    useLayoutEffect(() => {
        if(prevVideo) {
            ContextVideo.setPositionVideo(ContextVideo.positionVideo - 1);
            setPrevVideo(false);
        }
        
        if(nextVideo) {
            ContextVideo.setPositionVideo(ContextVideo.positionVideo + 1);
            setNextVideo(false);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevVideo, nextVideo])

    useEffect(() => {
        const handleKeyDown = (e) => {
            const ARROW_UP = 38;
            const ARROW_DOWN = 40;
            if(e.keyCode === ARROW_UP) {
                e.preventDefault();
                setPrevVideo(true);
                    
            } else if(e.keyCode === ARROW_DOWN) {
                e.preventDefault();
                setNextVideo(true);
            }

        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>{videoItem?.description}</title>
            </Helmet>
            <div className={cx('video-container')} onClick={handlePlayPauseVideo}>
                <div className={cx('header-search-wrapper')}>
                    <div className={cx('header-search-container')}>
                        <input type="text" className={cx('search-input')} placeholder="Tìm nội dung liên quan"></input>
                        <button className={cx('search-btn')}>
                            <SearchIcon width="2.4rem" height="2.4rem"/>
                        </button>
                    </div>
                </div>
                <div className={cx('video-blur-background')}>
                    <img src={videoItem?.thumb_url} alt="" />
                </div>
                <div className={cx('video-content')}>
                    <div className={cx('video-view')}>
                        <video 
                            ref={videoRef} 
                            src={videoItem?.file_url} 
                            poster={videoItem?.thumb_url}
                            loop
                            autoPlay
                        />
                    </div>
                </div>
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
                                transform: `scaleX(${seekbar}) translateY(-50%)`,
                            }}
                        ></div>
                    </div>
                    <div className={cx('seekbar-time-container')}>
                        <div className={cx('seekbar-time-item')}>{currentTime}</div>
                        <div className={cx('separation')}>/</div>
                        <div className={cx('seekbar-time-item')}>{totalTime}</div>
                    </div>
                </div>
                {!isPlaying && <PlayVideotIcon width="8rem" height="8rem" className={cx('pause-video-icon')}/>}
                <button className={cx('close-btn')} onClick={handleCloseDetailVideo}>
                    <CloseIcon/>
                </button>
                <button className={cx('menu-popper')}>
                    <MenuVideoIcon/>
                </button>
                { !(ContextVideo.positionVideo === 0) && 
                    <button className={cx('prev-video-btn')} onClick={handleSeePrevVideo}>
                        <ArrowLeftIcon/>
                    </button>
                }
                <button className={cx('next-video-btn')} onClick={handleSeeNextVideo}>
                    <ArrowRightIcon/>
                </button>
                <button className={cx('mini-video')}>
                    <MiniVideotIcon/>
                </button>
                <button className={cx('auto-scroll')}>
                    <AutoScrollIcon/>
                </button>
                <button className={cx('audio-control-btn')} onClick={handleMuteVideo}>
                    {ContextVideo.mutedVideo ? <MutevideoIcon /> : <AudiovideoIcon />}
                </button>
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
            <div className={cx('content-container')}>
                <div className={cx('info-comment-wrapper')}>
                    <div className={cx('info-comment-container')}>
                        <div className={cx('profile-container')}>
                            <div className={cx('content-description')}>
                                <div className={cx('content-info')}>
                                    <div className={cx('user')}>
                                        <Image className={cx('avatar')} src={videoItem?.user?.avatar} alt=""/>
                                        <div className={cx('user-info')}>
                                            <span className={cx('username')}>
                                                <span className={cx('username-text')}>{videoItem?.user?.nickname}</span>
                                                {videoItem?.user?.tick && <CheckIcon/>}
                                            </span>
                                            <p className={cx('nickname')}>{videoItem?.user?.nickname}</p>
                                        </div>
                                    </div>
                                    { videoItem?.user?.is_followed ? (
                                        <Button className={cx('following-btn')}>Đang Follow</Button>
                                    ) : (
                                        <Button primary className={cx('follow-btn')}>Follow</Button>
                                    )}      
                                </div>
                                <div className={cx('content-main')}>
                                    <p className={cx('video-desc')}>{videoItem?.description}</p>
                                    <p className={cx('video-music')}>
                                        <MusicIcon/>
                                        <span className={cx('music-name')}>{videoItem?.music}</span>
                                    </p>
                                </div>
                            </div>
                            <div className={cx('content-action')}>
                                <div className={cx('action-count')}>
                                    <div className={cx('action-interact')}>
                                        <button className={cx('action')}>
                                            <span className={cx('action-icon')}><HeartIcon width="20px" height="20px"/></span>
                                            <span className={cx('count')}>{videoItem?.likes_count}</span>
                                        </button>
                                        <button className={cx('action')}>
                                            <span className={cx('action-icon')}><CommentIcon width="20px" height="20px"/></span>
                                            <span className={cx('count')}>{videoItem?.comments_count}</span>
                                        </button>
                                        <button className={cx('action')}>
                                            <span className={cx('action-icon')}><FavoriteVideoIcon width="20px" height="20px"/></span>
                                            <span className={cx('count')}>{videoItem?.shares_count}</span>
                                        </button>
                                    </div>
                                    <div className={cx('share-group')}>
                                        <button className={cx('action-share')}>
                                            <EmbedShareIcon width="2.4rem" height="2.4rem"/>
                                        </button>
                                        <button className={cx('action-share')}>
                                            <FriendShareIcon width="2.4rem" height="2.4rem"/>
                                        </button>
                                        <button className={cx('action-share')}>
                                            <FacebookShareIcon width="2.4rem" height="2.4rem"/>
                                        </button>
                                        <button className={cx('action-share')}>
                                            <WhatsAppShareIcon width="2.4rem" height="2.4rem"/>
                                        </button>
                                        <button className={cx('action-share')}>
                                            <TwitterShareIcon width="2.4rem" height="2.4rem"/>
                                        </button>
                                        <button className={cx('action-share')}>
                                            <ShareIcon width="2.4rem" height="2.4rem"/>
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('copy-link')}>
                                    <p ref={linkVideoRef} className={cx('link')}>{videoItem?.file_url}</p>
                                    <button className={cx('copy-btn')} onClick={handleCopyLink}>Sao chép liên kết</button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('tab-menu-wrapper')}>
                            <div className={cx('tab-menu-container')}>
                                <div ref={commentTabRef} className={cx('tab-item')} onClick={handleComment}>
                                    <div className={cx('tab-item-text')}>
                                        Bình luận ({videoItem?.comments_count})
                                    </div>
                                </div>
                                <div ref={userVideoRef} className={cx('tab-item')} onClick={handleUserVideo}>
                                    <div className={cx('tab-item-text')}>
                                        Video của nhà sáng tạo
                                    </div>
                                </div>
                            </div>
                            <div className={cx('border')}></div>
                        </div>
                        {isCommentTab ? (
                            <ListComment data={commentList} />
                        ) : (                            
                            <div className={cx('video-list-container')}>
                                <div className={cx('video-list-wrapper')}>
                                    <div className={cx('video-item-container')}>
                                        <div className={cx('player-wrapper')}>
                                            <video src="https://files.fullstack.edu.vn/f8-tiktok/videos/2193-645ab193a41d7.mp4" />
                                            <div className={cx('play-count')}>
                                                <LikeCountVideoIcon />
                                                334.3K
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('video-item-container')}>
                                        <div className={cx('player-wrapper')}>
                                            <video src="https://files.fullstack.edu.vn/f8-tiktok/videos/2193-645ab193a41d7.mp4" />
                                            <div className={cx('play-count')}>
                                                <LikeCountVideoIcon />
                                                334.3K
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('video-item-container')}>
                                        <div className={cx('player-wrapper')}>
                                            <video src="https://files.fullstack.edu.vn/f8-tiktok/videos/2193-645ab193a41d7.mp4" />
                                            <div className={cx('play-count')}>
                                                <LikeCountVideoIcon />
                                                334.3K
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('video-item-container')}>
                                        <div className={cx('player-wrapper')}>
                                            <video src="https://files.fullstack.edu.vn/f8-tiktok/videos/2193-645ab193a41d7.mp4" />
                                            <div className={cx('play-count')}>
                                                <LikeCountVideoIcon />
                                                334.3K
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('video-item-container')}>
                                        <div className={cx('player-wrapper')}>
                                            <video src="https://files.fullstack.edu.vn/f8-tiktok/videos/2193-645ab193a41d7.mp4" />
                                            <div className={cx('play-count')}>
                                                <LikeCountVideoIcon />
                                                334.3K
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                { isCommentTab &&
                    <div className={cx('action-comment-wrapper')}>
                        {ContextAuth.isCurrentUser ? (
                            <InputCommment 
                                ref={CommentInputRef} 
                                textValue={commentInputValue}
                                onChange={handleChangeInputComment}
                                onClick={handlePostComment}
                                isTextValue={isCommentInputValue}
                            />
                        ) : (
                            <p className={cx('Login-bar')} onClick={handleLogin}>
                                Đăng nhập để bình luận
                            </p>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default VideoDetail;
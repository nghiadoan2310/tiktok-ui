import { useEffect, useRef, useContext, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./ViewProfile.module.scss";
import { EmptyVideoProfileIcon, LockLikedVideoIcon, LockProfileIcon } from "../icons";
import VideoProfileItem from "./VideoProfileItem";
import ProfileHeader from "./ProfileHeader";

import * as userService from '~/Services/userService'
import * as videoService from '~/Services/videoService'

import { AuthContext } from "~/components/Provider";
import { VideoContext } from "~/components/Provider";

const cx = classNames.bind(styles);

function ViewProfile() {
    const location = useLocation();

    const ContextAuth = useContext(AuthContext);
    const ContextVideo = useContext(VideoContext);

    const videoTabRef = useRef();
    const LikedTabRef = useRef();
    const lastestTypeRef = useRef();
    const trendingTypeRef = useRef();

    const [profileData, setProfileData] = useState({});
    const [tabVideo, setTabVideo] = useState(true);
    const [video, setVideo] = useState();
    const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
    const [likedVideoData, setlikedVideoData] = useState([]);

    const profileUsername = location.pathname.slice(2, location.pathname.length);

    useEffect(() => {
        if(profileUsername === ContextAuth.userData.nickname) {
            setIsCurrentUserProfile(true);
        } else {
            setIsCurrentUserProfile(false);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileUsername])

    useEffect(() => {
        if(!profileUsername) {
            return;
        }

        const fetchApi = async () => {
            const result = await userService.getAnUser(ContextAuth.tokenStr, profileUsername);

            if(result) {
                ContextVideo.setListVideo(result.videos)
                setProfileData(result)
            }else {
                console.log('Lấy thông tin người dùng thất bại')
            }
        }
        
        fetchApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profileUsername])

    useEffect(() => {
        videoTabRef.current.setAttribute('active', true);
        lastestTypeRef.current.setAttribute('active', true);
    }, [])
    
    useEffect(() => {
        if(tabVideo) {
            lastestTypeRef.current.setAttribute('active', true);
        } else {
            const fetchApi = async () => {
                const result = await videoService.getLikedVideos(ContextAuth.tokenStr, ContextAuth.userData.id);
    
                if(result) {
                    setlikedVideoData(result)
                }else {
                    console.log('Lấy danh sách video người dùng đã thích thất bại')
                }
            }
            
            fetchApi();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabVideo])

    useEffect(() => {
        if (video) {
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {}).catch((err) => {});
            }
        }

        return () => {
            if (video) {
                video.pause();
            }
        }
    }, [video])

    const handleClickVideoTab = () => {
        videoTabRef.current.setAttribute('active', true);
        LikedTabRef.current.removeAttribute('active');
        setTabVideo(true);
    }

    const handleClickLikedTab = () => {
        videoTabRef.current.removeAttribute('active');
        LikedTabRef.current.setAttribute('active', true);
        setTabVideo(false);
    }

    const handleClickLastestType = () => {
        lastestTypeRef.current.setAttribute('active', true);
        trendingTypeRef.current.removeAttribute('active');
    }

    const handleClickTrendingType = () => {
        lastestTypeRef.current.removeAttribute('active');
        trendingTypeRef.current.setAttribute('active', true);
    }

    return ( 
        <div className={cx('profile-wrapper')}>
            <div className={cx('profile-container')}>
                <ProfileHeader data={profileData} currentUserProfile={isCurrentUserProfile}/>
                <div className={cx('profile-main')}>
                    <div className={cx('tab-wrapper')}>
                        <div className={cx('tab-container')}>
                            <p ref={videoTabRef} className={cx('tab-content')} onClick={handleClickVideoTab}>
                                <span>Video</span>
                            </p>
                            <p ref={LikedTabRef} className={cx('tab-content')} onClick={handleClickLikedTab}>
                                <LockProfileIcon/>
                                <span className={cx('tab-title')}>Đã thích</span>
                            </p>
                            <div className={cx('tab-bottom-line')}></div>
                        </div>                       
                    </div>
                    {tabVideo ? (
                        <Fragment>
                            <div className={cx('soft-type-container')}>
                                <div ref={lastestTypeRef} className={cx('soft-type-btn')} onClick={handleClickLastestType}>
                                    Mới nhất
                                </div>
                                <div ref={trendingTypeRef} className={cx('soft-type-btn')} onClick={handleClickTrendingType}>
                                    Thịnh hành
                                </div>
                            </div>
                            { profileData.videos?.length === 0 ? (
                                <div className={cx('video-list-empty')}>
                                    <EmptyVideoProfileIcon/>
                                    { isCurrentUserProfile ? (
                                        <Fragment>
                                            <p className={cx('empty-title')}>
                                                Tải video đầu tiên của bạn lên
                                            </p>
                                            <p className={cx('empty-decs')}>
                                                Video của bạn sẽ xuất hiện tại đây
                                            </p>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <p className={cx('empty-title')}>
                                                Không có nội dung
                                            </p>
                                            <p className={cx('empty-decs')}>
                                                Người dùng này chưa đăng bất kỳ video nào
                                            </p>
                                        </Fragment>
                                    ) }
                                </div>
                            ) : (
                                <div className={cx('video-user-list')}>
                                    {profileData.videos?.map((video, index) => (
                                        <VideoProfileItem data={video} key={video.id} index={index} setVideo={setVideo}/>
                                    ))}
                                </div>
                            )}
                        </Fragment>
                    ) : (
                        <div className={cx('liked-video-private')}>
                            {isCurrentUserProfile ? (
                                <Fragment>
                                    { likedVideoData.length === 0 ? (
                                        <Fragment>
                                            <EmptyVideoProfileIcon/>
                                            <p className={cx('like-title')}>
                                                Chưa thích video nào
                                            </p>
                                            <p className={cx('like-desc')}>
                                                Những video bạn thích sẽ xuất hiện tại đây
                                            </p>
                                        </Fragment>
                                    ) : (
                                        <div className={cx('video-user-list')}>
                                            {likedVideoData.map((video, index) => (
                                                <VideoProfileItem data={video} key={video.id} index={index} setVideo={setVideo}/>
                                            ))}
                                        </div>
                                    )}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <LockLikedVideoIcon/>
                                    <p className={cx('like-title')}>
                                        Video đã thích của người dùng này ở trạng thái riêng tư
                                    </p>
                                    <p className={cx('like-desc')}>
                                        Các video được thích bởi {profileData.nickname} hiện đang ẩn
                                    </p>
                                </Fragment>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewProfile;
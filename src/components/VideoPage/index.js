import { useEffect, useState, useContext, useRef } from "react";
import classNames from "classnames/bind";

import styles from "./VideoPage.module.scss";
import { 
    MusicIcon,
    CheckIcon,
} from "../icons";
import Button from "../Button";
// import InputCommment from "../InputCommment";
import ListComment from "../ListComments";
import Image from "../Image";
import VideoList from "./VideoList";
import InputCommment from "../InputCommment";
import VideoPlayer from "./VideoPlayer";

import * as videoService from '~/Services/videoService'
import * as commentService from '~/Services/commentService'

import { AuthContext } from "../Provider";
import { VideoContext } from "../Provider";
import { ModalContext } from "../Provider";
import { NotifyContext } from "../Provider";

const cx = classNames.bind(styles);

function VideoPage({data=[]}) {

    const ContextAuth = useContext(AuthContext);
    const ContextVideo = useContext(VideoContext);
    const ContextModal = useContext(ModalContext);
    const ContextNotify = useContext(NotifyContext);

    const CommentInputRef = useRef();

    const [videoId, setVideoId] = useState();
    const [videoItem, setVideoItem] = useState({});
    const [commentList, setCommentList] = useState([]);
    const [commentInputValue, setCommentInputValue] = useState('');
    const [isCommentInputValue, setIsCommentInputValue] = useState(false);
    const [recommendVideoList, setRecommendVideoList] = useState([]);
    const [videoList, setVideoList] = useState([])

    useEffect(() => {
        setVideoId(window.location.pathname.split('/')[3]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextVideo.videoId])

    useEffect(() => {
        const fetchApi = async () => {
            //result là giá trị trả về của việc tìm kiếm
            const result_video = await videoService.getAVideo(videoId);
            const result_comment_list = await commentService.getComment(ContextAuth.tokenStr, videoId);

            setVideoItem(result_video);
            setCommentList(result_comment_list);
        }

        fetchApi();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId])

    useEffect(() => {
        if(data.length > 0 && ContextVideo.recommendVideoPosition + 2 <= data.length) {
            const RECOMMEND_LIST_ARRAY = [
                {
                    videoData: data[ContextVideo.recommendVideoPosition],
                    position: ContextVideo.recommendVideoPosition,
                },
                {
                    videoData: data[ContextVideo.recommendVideoPosition + 1],
                    position: ContextVideo.recommendVideoPosition + 1,
                },
                {
                    videoData: data[ContextVideo.recommendVideoPosition + 2],
                    position: ContextVideo.recommendVideoPosition + 2,
                }
            ] 
            setRecommendVideoList(RECOMMEND_LIST_ARRAY)
            setVideoList(data);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextVideo.recommendVideoPosition, data])

    const handleLogin = () => {
        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        }
    }

    useEffect(() => {
        if(!!commentInputValue && ContextAuth.isCurrentUser) {
            setIsCommentInputValue(false)
        }else if(!commentInputValue && ContextAuth.isCurrentUser){
            setIsCommentInputValue(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentInputValue])

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
    
    return (
        <div className={cx('video-detail-wrapper')}>
            <div className={cx('video-detail-container')}>
                <div className={cx('left-container')}>
                    <div className={cx('player-container')}>
                        <VideoPlayer videoItem={videoItem} recommendVideoList = {recommendVideoList}/>
                        <div className={cx('description-container')}>
                            <div className={cx('author-container')}>                                
                                <div className={cx('user')}>
                                    <Image className={cx('avatar')} src={videoItem?.user?.avatar} alt=""/>
                                    <div className={cx('user-info')}>
                                        <div className={cx('username')}>
                                            <div className={cx('username-text')}>{videoItem?.user?.nickname}</div>
                                            <CheckIcon/>
                                        </div>
                                        <div className={cx('nickname')}>
                                            <div className={cx('nickname-text')}>{videoItem?.user?.first_name} {videoItem?.user?.last_name}</div>
                                            <span style={{margin: '0 4px'}}>.</span>
                                            {videoItem?.updated_at?.split(' ')[0]}
                                        </div>
                                    </div>
                                </div>
                                <Button primary className={cx('follow-btn')}>Follow</Button> 
                            </div>
                            <div className={cx('video-info-container')}>
                                <div className={cx('video-desc')}>
                                    {videoItem?.description}
                                </div>
                                <div className={cx('video-music')}>
                                    <MusicIcon/>
                                    <p className={cx('music-text')}>{videoItem?.music}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('comment-container')}>
                        <p className={cx('comment-count')}>{videoItem?.comments_count} bình luận</p>
                        <div className={cx('comment-bar-container')}>
                            {ContextAuth.isCurrentUser && <Image 
                                className={cx('avatar-user')}
                                src={ContextAuth.userData?.avatar}
                                alt="avatar"
                            />}
                            <div className={cx('input-comment-container')}>
                                {ContextAuth.isCurrentUser ? (
                                    <InputCommment 
                                        ref={CommentInputRef}
                                        className={cx('input-comment-wrapper')} 
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
                        </div>
                        <div className={cx('comment-list-container')}>
                            <div className={cx('comment-list-wrapper')}>
                                <ListComment data={commentList} setVideoId={setVideoId}/>
                            </div>
                        </div>
                    </div>
                </div>
                <VideoList data={videoList}/>
            </div>
        </div>
    )
}

export default VideoPage;
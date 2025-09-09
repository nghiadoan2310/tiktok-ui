import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import classNames from "classnames/bind"

import styles from './VideoActions.module.scss'
import Image from "../Image"
import {  CommentIcon, ConfirmFollowIcon, FavoriteVideoIcon, FollowIcon, HeartActionIcon, HeartIcon, ShareIcon } from "../icons"
import Share from "./Share"

import * as likeService from '~/Services/likeSevice'
import * as followingService from '~/Services/followingService'

import { VideoContext } from '../Provider';
import { ModalContext } from "~/components/Provider";
import { AuthContext } from "~/components/Provider";

const cx = classNames.bind(styles)

function VideoActions({ data }) {
    const navigate = useNavigate();

    const ContextVideo = useContext(VideoContext);

    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);

    const [isLiked, setIsLiked] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if(data.is_liked) {
            setIsLiked(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if(data.user?.is_followed) {
            setIsFollowed(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleHeart = async () => {

        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        } else if(ContextAuth.isCurrentUser && !isLiked) {
            const result = await likeService.postLikeVideo(ContextAuth.tokenStr, data.id);

            if(!!result) {
                setIsLiked(true);
                data.likes_count++;
            }
        } else if(ContextAuth.isCurrentUser && isLiked) {
            const result = await likeService.postUnLikeVideo(ContextAuth.tokenStr, data.id);

            if(!!result) {
                setIsLiked(false);
                data.likes_count--;
            }
        }
    }

    const handleComment = () => {
        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        } else {
            ContextVideo.setVideoId(data.id);
            navigate(`/@${data.user.id}/video/${data.id}`);
            ContextVideo.handleShowDetailVideo();
        }
    }

    const handleFavorite = () => {
        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        }
    }

    const handleFollowUser = async () => {
        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        } else if(ContextAuth.isCurrentUser && !isFollowed) {
            const result = await followingService.postFollowAnUser(ContextAuth.tokenStr, data.user?.id);

            if(!!result) {
                setIsFollowed(true);
            }
        }
    }

    const handleUnFollowUser = async () => {
         if(ContextAuth.isCurrentUser && isFollowed) {
            const result = await followingService.postUnFollowAnUser(ContextAuth.tokenStr, data.user?.id);

            if(!!result) {
                setIsFollowed(false);
            }
        }
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('follow')} >
                <Link to={`/@${data.user.nickname}`}>
                    <Image className={cx('avatar')} src={data.user.avatar}/>
                </Link>
                    {isFollowed ? (
                        <button className={cx('unfollow-btn')} onClick={handleUnFollowUser}>
                            <ConfirmFollowIcon />
                        </button>
                    ) : (
                        <button className={cx('follow-btn')} onClick={handleFollowUser}>
                            <FollowIcon />  
                        </button>
                    )}
            </div>
            <button className={cx('action')} onClick={handleHeart}>
                <span className={cx('icon')}>
                    { isLiked ? <HeartActionIcon/> : <HeartIcon/>}
                </span>
                <strong className={cx('count')}>{data.likes_count}</strong>
            </button>
            <button className={cx('action')} onClick={handleComment}>
                <span className={cx('icon')}>
                    <CommentIcon />
                </span>
                <strong className={cx('count')}>{data.comments_count}</strong>
            </button>
            <button className={cx('action')} onClick={handleFavorite}>
                <span className={cx('icon')}>
                    <FavoriteVideoIcon />
                </span>    
                <strong className={cx('count')}>{data.shares_count}</strong>
            </button>

            <Share>
                <button className={cx('action')}>
                    <span className={cx('icon')}>
                        <ShareIcon />
                    </span>
                    <strong className={cx('count')}>{data.shares_count}</strong>
                </button>
            </Share>
        </div>
    )
}

export default VideoActions
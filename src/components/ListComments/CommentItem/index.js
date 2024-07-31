import { useState, useContext, useEffect } from "react";
import classNames from "classnames/bind";

import styles from './CommentItem.module.scss'
import { 
    ArrowRightIcon, 
    HeartActionIcon, 
    HeartCommentIcon, 
    MenuVideoIcon, 
} from "~/components/icons";
import Image from "~/components/Image";

import * as likeService from '~/Services/likeSevice'

import { ModalContext } from "~/components/Provider";
import { AuthContext } from "~/components/Provider";

const cx = classNames.bind(styles)

function CommentItem({ commentItem = {}}) {
    const ContextModal = useContext(ModalContext);
    const ContextAuth = useContext(AuthContext);

    const [isLikeComment, setLikeComment] = useState(false);

    useEffect(() => {
        if(commentItem.is_liked) {
            setLikeComment(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleLikeComment = async () => {
        if(!ContextAuth.isCurrentUser) {
            ContextModal.handleShowModalLoginForm();
            ContextModal.handleShowModal();
        } else if(ContextAuth.isCurrentUser && !isLikeComment) {
            const result = await likeService.postLikecomment(ContextAuth.tokenStr, commentItem.id);

            if(!!result) {
                setLikeComment(true);
                commentItem.likes_count++;
            }
        } else if(ContextAuth.isCurrentUser && isLikeComment) {
            const result = await likeService.postUnLikecomment(ContextAuth.tokenStr, commentItem.id);

            if(!!result) {
                setLikeComment(false);
                commentItem.likes_count--;
            }
        }
    }

    return (
        <div className={cx('comment-item-container')}>
            <div className={cx('comment-content-container')}>
                <div className={cx('user-avatar')}>
                    <Image src={commentItem.user.avatar} alt=""></Image>
                </div>
                <div className={cx('comment-container')}>
                    <p className={cx('user-name')}>{commentItem.user.first_name} {commentItem.user.last_name}</p>
                    <p className={cx('comment-text')}>{commentItem.comment}</p>
                    <p className={cx('comment-sub-content')}>
                        <span className={cx('comment-time')}>{commentItem.updated_at}</span>
                        <span className={cx('reply-btn')}>Trả lời</span>
                    </p>
                </div>
                <div className={cx('comment-action')}>
                    <button className={cx('comment-more-btn')}>
                        <MenuVideoIcon/>
                    </button>
                    <button className={cx('comment-heart-btn')} onClick={handleLikeComment}>
                        {isLikeComment ? <HeartActionIcon width="2rem" height="2rem"/> : <HeartCommentIcon/>}
                        <span className={cx('heart-count')}>{commentItem.likes_count}</span>
                    </button>
                </div>
            </div>
            <div className={cx('comment-reply')}>
                <p className={cx('comment-reply-text')}>Xem 3 câu trả lời</p>
                <ArrowRightIcon width="1.4rem" height="1.4rem" fill="rgba(22, 24, 35, 0.5)" className={cx('comment-reply-icon')}/>
            </div>
        </div>  
    )
}

export default CommentItem;
import { useContext } from "react";
import classNames from "classnames/bind";

import { VideoContext } from "~/components/Provider";

import styles from './RecommendVideoList.module.scss';
import { 
    PlayVideotIcon,
    LikeCountVideoIcon 
} from "~/components/icons";

const cx = classNames.bind(styles);

function RecommendVideoItem({item = {}, index}) {

    const ContextVideo = useContext(VideoContext)

    const handleSelectVideo = (item, index) => {
        ContextVideo.setRecommendVideoPosition(index);
        ContextVideo.setVideoId(item.id);
        ContextVideo.setVideoUsername(item?.user.nickname);
        ContextVideo.setIsChangeState(true);
    }

    return (
        <div className={cx('recommend-item-container')} onClick={() => handleSelectVideo(item, index)}>
            <div className={cx('recommend-item-wrapper')}>
                <img src={item?.thumb_url} alt="" />
                <div className={cx('play-icon')}>
                    <PlayVideotIcon width="4rem" height="4rem"/>
                </div>
                <div className={cx('mask')}></div>
                <div className={cx('play-count')}>
                    <LikeCountVideoIcon width="2rem" height="2rem"/>
                    {item?.likes_count}
                </div>
            </div>
            <div className={cx('recommend-item-description')}>
                {item?.description} 
            </div>
        </div>
    )
}

export default RecommendVideoItem;
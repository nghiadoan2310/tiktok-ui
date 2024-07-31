import { Fragment, useLayoutEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "./VideoBottom.module.scss";
import { CheckIcon, MusicIcon } from "~/components/icons";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

function VideoBottom({ data }) {

    const [isMoreBtn, setIsMoreBtn] = useState(false);
    const descriptionRef = useRef();
    const descriptionTextRef = useRef();
    const moreBtnRef = useRef();

    const handleInfoUser = (e) => {
        e.stopPropagation();
    }

    const handleMoreBtn = (e) => {
        e.stopPropagation();
        descriptionTextRef.current.toggleAttribute('active');
        moreBtnRef.current.toggleAttribute('active');

        if (moreBtnRef.current.innerText === 'thêm') {
            moreBtnRef.current.innerText = 'ẩn bớt';
        } else {
            moreBtnRef.current.innerText = 'thêm';
        }
    }

    const handleMusicVideo = (e) => {
        e.stopPropagation();
        
    }

    useLayoutEffect(() => {
        const maxHeight = descriptionRef.current.scrollWidth - 5;

        // Kiểm tra nếu nội dung tràn ra ngoài một dòng
        if (descriptionTextRef.current.scrollWidth > maxHeight) {
            setIsMoreBtn(true);
        }
    }, [])

    return (
        <Fragment>
            <div className={cx('author')}>
                <Button to={`/@${data.user.nickname}`} className={cx('username')} onClick={handleInfoUser}>{data.user.nickname}</Button>
                {data.user.tick && <CheckIcon />}
            </div>
            <div ref={descriptionRef} className={cx('description')}>
                <p ref={descriptionTextRef} className={cx('description-text')}>{data.description}</p>
                {isMoreBtn && <button ref={moreBtnRef} className={cx('more-btn')} onClick={handleMoreBtn}>thêm</button>}
            </div>
            <div className={cx('music')}>
                <MusicIcon className={cx('music-icon')}/>
                <span className={cx('music-text')} onClick={handleMusicVideo}>{data.music}</span>                
            </div>
        </Fragment>
    )
}

export default VideoBottom;
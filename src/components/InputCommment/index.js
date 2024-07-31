import { forwardRef, Fragment, useEffect } from "react"
import classNames from "classnames/bind"

import styles from './InputCommment.module.scss'
import { 
    EmojiIcon, 
    MentionIcon, 
} from "../icons";

const cx = classNames.bind(styles)

function InputCommment({ ref, className,  isTextValue, textValue, onChange, onClick}) {

    useEffect(() => {
        if(ref) {
            ref.current.focus();
        }

    }, [ref])

    return (
        <Fragment>
            <div className={cx('action-comment-container')}>
                <div className={cx('input-container')}>
                    <input 
                        ref={ref} 
                        type="text" 
                        placeholder="Thêm bình luận..." 
                        className={cx('input-comment', className)} 
                        value={textValue}
                        onChange={onChange}
                    />                               
                </div> 
                <button className={cx('input-comment-btn')}>
                    <MentionIcon/>
                </button>
                <button className={cx('input-comment-btn')}>
                    <EmojiIcon/>
                </button>
            </div>
            <button disabled={isTextValue} className={cx('comment-btn')} onClick={onClick}>Đăng</button>
        </Fragment>
    )
}

export default forwardRef(InputCommment);
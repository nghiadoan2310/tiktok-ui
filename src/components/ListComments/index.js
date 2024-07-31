import classNames from "classnames/bind";

import styles from './ListComments.module.scss'
import CommentItem from "./CommentItem";

const cx = classNames.bind(styles);

function ListComment({ data=[] }) {
    return (
        <div className={cx('comment-wrapper')}>
            {data.map((item) => (
                <CommentItem commentItem={item} key={item.id}></CommentItem>
            )
        )}
        </div>
    )
}

export default ListComment;
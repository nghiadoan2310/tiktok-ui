import classNames from "classnames/bind"

import styles from './FollowingAccounts.module.scss'
import AccountItem from "./AccountItem"

const cx = classNames.bind(styles)

function FollowingAccounts({ label, followed, data=[], onClickSeeMore, showMoreBtn }) {

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            { followed ? (
                <>
                {data.map((user, index) => (
                    <AccountItem key={index} data={user}/>
                ))}

                    { showMoreBtn ? (
                        <p className={cx('more-btn')} onClick={onClickSeeMore}>Xem thêm</p>
                    ) : (
                        <p className={cx('more-btn')} onClick={onClickSeeMore}>Ẩn bớt</p>
                    ) }
                </>
            ) : (
                <p className={cx('no-follow')}>Những tài khoản bạn follow sẽ xuất hiện tại đây</p>
            )
                
            }
        </div>
    )
}

export default FollowingAccounts
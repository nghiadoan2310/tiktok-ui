import classNames from "classnames/bind"

import styles from './FollowingAccounts.module.scss'
import AccountItem from "./AccountItem"

const cx = classNames.bind(styles)

function FollowingAccounts({ label, followed, data=[] }) {

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            { followed ? (
                <>
                {data.map((user) => (
                    <AccountItem key={user.id} data={user}/>
                ))}

                    <p className={cx('more-btn')}>Xem thêm</p>
                </>
            ) : (
                <p className={cx('no-follow')}>Những tài khoản bạn follow sẽ xuất hiện tại đây</p>
            )
                
            }
        </div>
    )
}

export default FollowingAccounts
import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

import styles from "./FollowingAccounts.module.scss"
import Image from "~/components/Image"

const cx = classNames.bind(styles)

function AccountItem({ data={} }) {
    return (
        <Link className={cx('account-item')} to={`/@${data.nickname}`}>
            <Image 
                className={cx('avatar')}
                src={data.avatar}
                alt={data.nickname}
            />
            <div className={cx('item-info')}>
                <div className={cx('nickname')}>
                    <span className={cx('nickname-name')}>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon icon={faCircleCheck} className={cx('check')}/>}
                </div>
                <div className={cx('name')}>
                    {data.first_name} {data.last_name}
                </div>
            </div>
        </Link>
    )
}

export default AccountItem
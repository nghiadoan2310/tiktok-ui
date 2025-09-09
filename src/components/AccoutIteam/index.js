import PropTypes from 'prop-types'
import classNames from "classnames/bind"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import styles from './AccoutIteam.module.scss'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import Image from "../Image";

const cx = classNames.bind(styles);

function AccoutIteam({data, onClick}) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')} onClick={onClick}>
            <Image
                src={data.avatar}
                alt={data.nickname}
                className={cx('avatar')}
            />
            <div className={cx('info')}>
                <p className={cx('username')}>
                    <span className={cx('username-name')}>{data.nickname}</span>
                    {data.tick && <FontAwesomeIcon icon={faCheckCircle} className={cx('check')}/>}
                </p>
                <p className={cx('name')}>
                    {data.full_name}
                </p>
            </div>
        </Link>
    )
}

//ràng buộc kiểu dữ liệu
AccoutIteam.propTypes = {
    data: PropTypes.object.isRequired,
}

export default AccoutIteam;
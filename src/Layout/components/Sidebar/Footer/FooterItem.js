import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function FooterItem({ data={} }) {
    return (
        <>
            <p className={cx('header')}>{data.title}</p>
            <div className={cx('container')}>
                {
                    data.children.map((item, index) => (
                        <Link key={index} to={item.to} className={cx('link')}>{item.title}</Link>
                    ))
                }
            </div>
        </>
    )
}

export default FooterItem
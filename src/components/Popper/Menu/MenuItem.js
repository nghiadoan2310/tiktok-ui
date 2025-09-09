import { useContext } from 'react';
import classNames from 'classnames/bind';

import Button from "~/components/Button"
import styles from './Menu.module.scss'
import { Fragment } from 'react';

import { AuthContext } from '~/components/Provider';

const cx = classNames.bind(styles);

function MenuItem({data, onClick}) {

    const ContextAuth = useContext(AuthContext);

    const classes = cx('menu-item', {
        separate: data.separate
    })

    return (
        <Fragment>
            { data.title === 'Xem hồ sơ' ? (
                <Button className={classes} icon={data.icon} to={`/@${ContextAuth.userData.nickname}`} onClick={onClick}>
                    {data.title}
                </Button>
            ) : (
                <Button className={classes} icon={data.icon} to={data.to} onClick={onClick}>
                    {data.title}
                    <div style={{position: "absolute", right: 0, paddingRight: 16}}>
                        {data.action}
                    </div>
                </Button>
            )}
        </Fragment>
    )
}

export default MenuItem
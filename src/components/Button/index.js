import classNames from "classnames/bind"
import { Link } from "react-router-dom";

import styles from './Button.module.scss'

const cx = classNames.bind(styles);

function Button({ to, href, children, primary, ref, outline, className, icon, onClick, disabled, ...passProps }) {
    let Comp = 'button'
    const props = {
        ref,
        onClick,
        icon,
        disabled,
        ...passProps
    }

    if (to) {
        props.to = to
        Comp = Link
    } else if(href) {
        props.href = href
        Comp = 'a'
    }

    const classes = cx('wrapper', {
        [className] : className,    //thêm class để custom button
        primary,
        outline
    })

    return (
        <Comp className={classes} {...props}>
            {icon && <span className={cx('icon')}>{icon}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    )
}

export default Button;
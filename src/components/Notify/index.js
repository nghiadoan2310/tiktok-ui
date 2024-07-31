import { Fragment, useState, useContext, useEffect } from "react";
import classNames from "classnames/bind";

import styles from './Notify.module.scss';

import { NotifyContext } from "../Provider";

const cx = classNames.bind(styles);

function Notify() {

    const ContextNotify = useContext(NotifyContext);

    const [isNotify, setIsNotify] = useState(ContextNotify.isNotify);
    const [isEndAnimate, setIsEndAnimate] = useState(false);

    useEffect(() => {
        setIsNotify(ContextNotify.isNotify);

        setIsEndAnimate(false);
        
        let timeoutEndAnimate = setTimeout(() => {
            setIsEndAnimate(true);
        }, ContextNotify.delay);

        return () => {
            clearTimeout(timeoutEndAnimate);
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ContextNotify.isNotify])

    const handleHideNotify = () => {
        ContextNotify.setIsNotify(false);
    }

    return (
        <Fragment>
            { isNotify && 
                <div 
                    className={cx('copy-notify-container', {
                        'hide-notify': isEndAnimate
                    })}
                    onAnimationEnd={ isEndAnimate ? handleHideNotify : null }
                >
                    <div className={cx('copy-notify-content')}>
                        <span className={cx('copy-notify-text')}>{ContextNotify.message}</span>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Notify;
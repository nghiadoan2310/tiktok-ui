import { forwardRef, useState } from "react";
import classNames from "classnames";

import images from "~/assets/img";
import styles from "./Image.module.scss"

function Image({src, className, fallback : customFallback = images.noAvatar, ...props}, ref) {

    //customFallback được dùng để thay đổi ảnh lỗi linh hoạt hơn
    /*cú pháp ES6 fallback : customFallback = images.noImage nếu có không có fallback truyền vào 
    thì sẽ lấy mặc định ảnh images.noImage*/

    const [fallback, setFallback] = useState('');

    //Xử lý khi ảnh bị lỗi link
    const handleError = () => {
        setFallback(customFallback);
    }

    // eslint-disable-next-line jsx-a11y/alt-text
    return <img className={classNames(styles.Wrapper, className)} ref={ref} {...props} src={fallback || src} onError={handleError}/>
}

export default forwardRef(Image);
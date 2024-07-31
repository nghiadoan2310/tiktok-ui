import { useState, useRef, useEffect } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { faCircleXmark, faSpinner} from "@fortawesome/free-solid-svg-icons";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import AccoutIteam from "~/components/AccoutIteam";
import { SearchIcon } from "~/components/icons";
import styles from "./Search.module.scss";
import { useDebounce } from "~/Hooks";
import * as searchService from "~/Services/searchService";

const cx = classNames.bind(styles);

function Search() {
  const inputRef = useRef();

  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  //Hiển thị menu search
  const [searchResult, setSearchResult] = useState([]);

  //delay searchValue 500ms
  const debounce = useDebounce(searchValue, 500)

  //useEffect nếu có sự thay đổi debounce (searchValue) thì fetch API 
  useEffect(() => {
    //Nếu đầu vào là chuỗi rỗng
    if(!debounce.trim()) {
      setSearchResult([]);
      return
    }

    /*encodeURIComponent được sử dụng để mã hoá các ký tự đặc biệt (VD: ?, &&, =) tránh lỗi  khi người 
    dùng nhập vào tìm kiếm*/
    // Dùng fetch gọi API
    // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
    //   .then(res => res.json())

    //Dùng axios
    const fetchApi = async () => {
      setLoading(true);
      //result là giá trị trả về của việc tìm kiếm
      const result = await searchService.search(debounce);

      setSearchResult(result);
      setLoading(false);
    }

    fetchApi();

  },[debounce])

  //Xử lý khi người dùng click ra ngoài khi trc đó đang focus input search
  const handleHideResult = () => {
    setShowResult(false);
  }

  //xử lý chuỗi input người dùng nhập vào ô input search
  const handleChange = (e) => {
    const searchValue = e.target.value;
  
    //Kiểm tra người dùng nhập ký tự đầu có phải dấu cách không
    if(!searchValue.startsWith(' ')) {
      return setSearchValue(searchValue);
    }
  }

  return (
    //Thêm thẻ span wrap tippy để fix warning tippy
    <span>
      <HeadlessTippy
        interactive //tương tác
        visible = {showResult && searchResult.length > 0} //yêu cầu hiển thị
        offset={[0, 7]}
        //Hiển thị
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Tài khoản</h4>
              {searchResult.map((result) => (
                <AccoutIteam key={result.id} data={result} onClick={handleHideResult}/>
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            placeholder="Tìm kiếm"
            spellCheck={false}    //xoá dấu gạch chân đỏ khi sai chính tả
            onChange={handleChange}
            onFocus={() => {setShowResult(true)}}
            // onBlur={handleHideResult}
          />
  
          {!!searchValue && !loading && (
            <button
              className={cx("clear")}
              onClick={() => {
                setSearchValue("");
                inputRef.current.focus();
              }}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}
  
          <button className={cx("search-btn")}>
            <SearchIcon width="2.4rem" height="2.4rem" />
          </button>
        </div>
      </HeadlessTippy>
    </span>
  );
}

export default Search;

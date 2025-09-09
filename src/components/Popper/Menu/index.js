/* -----------------------FILE MENU LỰA CHỌN TRONG PHẦN HEADER (KHI NHẤN AVATAR)------------- */

import { useContext, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Menu.module.scss";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import MenuItem from "./MenuItem";
import Header from "./Header";
import Button from "~/components/Button";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "~/components/Provider";
import { AuthContext } from "~/components/Provider";
import { CheckboxIcon } from "~/components/icons";
import { changeTheme } from "~/theme";

const cx = classNames.bind(styles);

function Menu({ children, hideOnClick = false, items = [] }) {

  const Context = useContext(ModalContext);
  const ContextAuth = useContext(AuthContext);

  const [history, setHistory] = useState([{ data: items }]);
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme"));

  var current = history[history.length - 1];

  const renderItems = () => {
      if(current.title === 'Ngôn ngữ') {
        const language = JSON.parse(localStorage.getItem("language"));
        current.data.forEach((item, index) => {
          if(item.code === language.code) {
            let selected = current.data.splice(index, 1)[0]; //lấy ra phần tử đã chọn
            selected.action = <CheckboxIcon fill='#111'/>
            current.data.unshift(selected); //đưa phần tử đã chọn lên đầu
            return
          }
        })
      }

      if (current.title === "Chế độ tối") {
        current.data.forEach((item, index) => {
            item.onClick = () => {
              localStorage.setItem("theme", item.code)
              changeTheme(item.code)
              setThemeMode(item.code)              
            }
          if(item.code === themeMode) {
            item.action = <CheckboxIcon fill='#111'/>
          } else {
            item.action = <></>
          }
        })
      }

    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if(isParent) {
              setHistory([...history, item.children]);
            } else if(item.onClick) {
              item.onClick();
            }
          }}
        />
      );
    });
  };

  const handleShowModalLogOut = () => {
    Context.handleShowModalLogOut();
    Context.handleShowModal();
  }

  return (
    
    <div>
      <Tippy
        interactive //tương tác
        placement="bottom-end"
        delay={[0, 700]}
        offset={[10, 10]}
        hideOnClick={hideOnClick}
        //Hiển thị
        render={(attrs) => (
          <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx("menu-popper")}>
              {history.length > 1 && (
                <Header
                  title={current.title}
                  onBack={() => {
                    setHistory(history.slice(0, history.length - 1));
                  }}
                />
              )}
              <div className={cx("menu-body")}>
                {renderItems()}
  
                {!(history.length > 1) && ContextAuth.isCurrentUser &&
                (
                  <Button
                    className={cx('menu-item', 'separate')}
                    icon={<FontAwesomeIcon icon={faArrowRightFromBracket}/>}
                    onClick={handleShowModalLogOut}
                  >
                    Đăng xuất
                  </Button>
                )}
              </div>
            </PopperWrapper>
          </div>
        )}
  
        //khi menu bị ẩn sẽ trở về trang đầu của menu
        onHide={() => {
          setHistory(history.slice(0, 1));
        }}
      >
        {children}
      </Tippy>  
    </div>
  );
}

export default Menu;

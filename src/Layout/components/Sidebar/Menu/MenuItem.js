import { useContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom"; //NavLink (khác Link) hỗ trợ việc active
import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
import Image from "~/components/Image";

import { AuthContext } from "~/components/Provider";

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, activeIcon, currentUser = false }) {

  const ContextAuth = useContext(AuthContext);

  return (
    <NavLink
      className={(nav) => cx("menu-item", { active: nav.isActive })}
      to={to}
    >
      {/* Thay đổi icon mục hồ sơ */}
      {!currentUser ? (
        <span className={cx("menu-icon")}>{icon}</span>
      ) : (
        <Image
          src={ContextAuth.userData.avatar}
          className={cx("avatar")}
        />
      )}

      {/* Hiển thị icon khi action */}
      {!!activeIcon && (
        <span className={cx("menu-active-icon")}>{activeIcon}</span>
      )}
      <span className={cx("menu-title")}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default MenuItem;

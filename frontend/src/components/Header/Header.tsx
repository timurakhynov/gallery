import React, { useEffect, MouseEvent } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch, AppState } from "../../store/store";
import { checkToken, initState } from "../../store/users/users.slice";
import styles from "./Header.module.css";
import { getPhotos, getUserName } from "../../store/photos/photos.slice";

const Header: React.FunctionComponent = (): React.ReactElement => {
  const {user, isAuth} = useSelector((state: AppState) => state.users, shallowEqual)
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const logoutHandler = async() => {
    const logout = confirm("Are you sure you want logout?")
    if (logout) {
      localStorage.removeItem('token')
      dispatch(initState())
      window.location.reload()
    }
  }

  useEffect(() => {
    dispatch(checkToken())
  }, []);

  const userPhotos = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    navigate({pathname: `/gallery`, search: `user=${user?._id}`})
    dispatch(getPhotos(user?._id))
    dispatch(getUserName(user?._id!))
}

  return (
    <header className={styles.Header}>
      <div className={styles.Header_container}>
        <NavLink className={styles.Header__link} to={"/"}>
          Gallery
        </NavLink>
        {isAuth && user ?
          <div>
            <span className={styles.Header__username}>
              Hello, <span className={styles.Header__username_name} onClick={userPhotos}>{user.username}</span>
            </span>
            <button className={[styles.Header__link, styles.Header__logout].join(' ')} onClick={logoutHandler}>Logout</button>
          </div>
          :
          <div>
            <NavLink className={styles.Header__link} to={'/login'}>Login</NavLink>
            <NavLink className={styles.Header__link} to={'/register'}>Register</NavLink>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;

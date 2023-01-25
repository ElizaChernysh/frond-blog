import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {checkIsAuth, logout} from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: "white",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast('Ви вийшли із системи')
  }

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xl text-white rounded-sm">
        E
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/"}
              className="text-xl text-black-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              className="text-xl text-black-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мої пости
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              className="text-xl text-black-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Додати пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xl text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler}>Вийти</button>
        ) : (
          <Link to={'/login'}>
            Увійти
          </Link>
        )}
      </div>
    </div>
  );
};

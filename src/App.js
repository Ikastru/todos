import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import { setStateChangeHandler } from './api.js';

export default function App() {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState();

    const handleBurgerClick = evt => {
        evt.preventDefault();
        setShowMenu(!showMenu);
    };

    const authStateChanged = __user => {
        setUser(__user);
    };

    useEffect(() => {
        const unsubscribe = setStateChangeHandler(authStateChanged);
        return () => {unsubscribe()};
    }, []);

    return (
        <div className="container">
            <nav className="navbar is-light">
                <div className="navbar-brand">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            'navbar-item is-uppercase' +
                            (isActive ? ' is-active' : '')
                        }
                    >
                        {user ? user.email : 'Todos'}
                    </NavLink>
                    <a href="/"
                        className={showMenu ?
                            'navbar-burger is-active' :
                            'navbar-burger'}
                        onClick={handleBurgerClick}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
                <div className={showMenu ?
                                   'navbar-menu is-active' :
                                   'navbar-menu'}
                    onClick={handleBurgerClick}
                >
                    <div className="navbar-start">
                        {user && (
                            <NavLink
                                to="/add"
                                className={({ isActive }) =>
                                    'navbar-item' +
                                    (isActive ? ' is-active' : '')
                                }
                            >
                                Создать дело
                            </NavLink>
                        )}
                        {!user && (
                            <NavLink to="/login"
                             className={({ isActive }) =>
                             'navbar-item' + (isActive ? ' is-active' : '')}
                            >
                                Войти
                            </NavLink>
                        )}
                        {!user && (
                            <NavLink to="/register"
                             className={({ isActive }) =>
                             'navbar-item' + (isActive ? ' is-active' : '')}
                            >
                                Зарегистрироваться
                            </NavLink>
                        )}
                    </div>
                    {user && (
                        <div className="navbar-end">
                            <NavLink to="/logout" className="navbar-item">
                                Выйти
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
            <main className="content px-6 py-6">
                <Outlet />
            </main>
        </div>
    );
}

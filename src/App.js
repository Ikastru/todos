import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from "./api";

export default function App() {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser().then(setUser);
    }, []);

    const handleBurgerClick = evt => {
        evt.preventDefault();
        setShowMenu(!showMenu);
    };

    const handleLogout = async () => {
        const result = await logout();
        if (result.status === "loggedOut") {
            setUser(null); // Сбрасываем состояние пользователя
            navigate("/"); // Перенаправляем на главную
        }
    };

    return (
        <div className="container">
            <nav className="navbar is-light">
                <div className="navbar-brand">
                    <NavLink to="/" className={({ isActive }) => 'navbar-item is-uppercase' + (isActive ? ' is-active' : '')}>
                        {user ? user.email : 'Todos'}
                    </NavLink>
                    <a href="/" className={showMenu ? 'navbar-burger is-active' : 'navbar-burger'} onClick={handleBurgerClick}>
                        <span></span><span></span><span></span><span></span>
                    </a>
                </div>
                <div className={showMenu ? 'navbar-menu is-active' : 'navbar-menu'} onClick={handleBurgerClick}>
                    <div className="navbar-start">
                        {user && (
                            <NavLink to="/add" className={({ isActive }) => 'navbar-item' + (isActive ? ' is-active' : '')}>
                                Создать дело
                            </NavLink>
                        )}
                        {!user && (
                            <NavLink to="/login" className={({ isActive }) => 'navbar-item' + (isActive ? ' is-active' : '')}>
                                Войти
                            </NavLink>
                        )}
                        {!user && (
                            <NavLink to="/register" className={({ isActive }) => 'navbar-item' + (isActive ? ' is-active' : '')}>
                                Зарегистрироваться
                            </NavLink>
                        )}
                    </div>
                    {user && (
                        <div className="navbar-end">
                            {/* Заменяем NavLink на кнопку с обработчиком */}
                            <button className="navbar-item button is-text" onClick={handleLogout}>
                                Выйти
                            </button>
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
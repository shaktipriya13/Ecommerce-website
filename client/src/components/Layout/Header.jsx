import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

const Header = () => {
    const [auth, setauth] = useAuth();
    const handleLogout = () => {
        setauth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        setTimeout(() => {
            toast.success("Logged Out ")
        }, 300);
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">
                    🛍️ ShopMitra</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link active" aria-current="page"  >Home</NavLink>
                        </li>
                        {!auth?.user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">
                                        Register
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item dropdown">
                                    {/* <NavLink
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        style={{ border: "none" }}
                                    >
                                        {auth?.user?.name}
                                    </NavLink> */}
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {auth?.user?.name}
                                    </a>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink
                                                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                    }`}
                                                // based on role we direct to admin or user dashboard
                                                className="dropdown-item"
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={handleLogout}
                                                to="/login"
                                                className="dropdown-item"
                                            >
                                                Logout
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <NavLink to='/cart' className="nav-link"  >Cart(0)</NavLink>
                        </li>


                    </ul>

                </div>
            </div>
        </nav>

    );
}

export default Header;

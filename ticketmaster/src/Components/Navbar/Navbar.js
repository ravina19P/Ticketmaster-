import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);
    const userInfoString = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userInfoString);

    useEffect(() => {
        const userInfo = localStorage.getItem("userinfo");
        if (userInfo !== null) {
            setIsLogin(true);
        }
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/Login";
    };
    if (!isLogin) {
        return null;
    }
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        {userInfo && (userInfo.role === "Employee" || userInfo.role === "Admin Department Employee" || userInfo.role === "Department Head" || userInfo.role === "Super Admin") && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Dashboard'>Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Tickets'>Tickets</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/New-Tickets'>New-Tickets</Link>
                                </li>
                                {userInfo && (userInfo.role === "Employee" || userInfo.role === "Admin Department Employee" || userInfo.role === "Department Head") &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/LeaveAproval'>Leave Aproval</Link>
                                    </li>
                                }
                            </>
                        )}

                        {userInfo && (userInfo.role === "Super Admin") && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Department'>Department</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Employee'>Employee</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Leaves'>Leaves</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {isLogin && (
                            <Link className="nav-link">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faUserCircle} style={{ color: 'white', fontSize: '25px', marginRight: '10px' }} />
                                        <span style={{ color: 'white', fontSize: '15px', marginRight: '10px' }}>{userInfo.employeeName}</span>
                                    </div>
                                    <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: 'white', fontSize: '25px' }} onClick={() => logout()} />
                                </div>
                            </Link>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

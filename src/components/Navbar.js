import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const funcLogout = () => {
        localStorage.removeItem('authToken');
    }
    let location = useLocation();
    useEffect(() => { }, [location]);

    //Geting User Data
    const [user, setUser] = useState('blank');
    const funcGetUser = async () => {
        const responce = await fetch('http://localhost:5000/api/auth/getuser', {
            method: 'POST',
            headers: {
                'authToken': localStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            }
        });
        const jsonData = await responce.json();
        setUser(jsonData.name);
    }

    if (localStorage.getItem('authToken')) {
        funcGetUser()
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('authToken') ? <form className="d-flex">
                            <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-outline-primary mx-1" to="/signup" role="button">SignUp</Link>
                        </form> : <div className="d-flex" style={{ alignItems: 'center' }}><h5 style={{ margin: '0px 8px' }} className='text-light'>{`Welcome ${user} !`}</h5> <Link className="btn btn-outline-warning mx-1" to="/login" onClick={funcLogout} role="button">Logout</Link></div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

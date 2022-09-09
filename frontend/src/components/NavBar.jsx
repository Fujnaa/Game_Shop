import React from 'react';
import { Link } from 'react-router-dom';

import {useState} from 'react';
import LoginForm from './LoginForm';

const NavBar = () => {

const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <div className="navBar">
                <h1 className="logo">ClutchCamp</h1>
                <input type="checkbox" id="nav-toggle" class="nav-toggle" />
                <label for="nav-toggle" class="nav-toggle-label">
                    <span></span>
                </label>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" className="navLink">Home</Link>
                        </li>
                        <li>
                            <Link to="/store" className="navLink">Store</Link>
                        </li>
                        <li>
                            <Link to="/rent" className="navLink">Rent</Link>
                        </li>
                        <li className='nav-loginButton'>
                            <button id="loginBtn" onClick={() => setShowLogin(true)}>Login</button>
                        </li>
                    </ul>
                </nav>
            </div>

            {showLogin ? <LoginForm /> : <> </>}
            
        </>

    );
}

export default NavBar;
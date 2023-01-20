import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useEffect } from 'react';
import axios from 'axios';
import api from '../api/api';

const NavBar = (props) => {

    const [showLogin, setShowLogin] = useState(false);

    const [showRegister, setShowRegister] = useState(false);

    const [userToken, setUserToken] = useState("");

    const [isUserLogged, setIsUserLogged] = useState(false);

    const [profileImagePath, setProfileImagePath] = useState("https://via.placeholder.com/600");
    const [profileUsername, setProfileUsername] = useState("");
    const [profileEmail, setProfileEmail] = useState("");
    const [profileRole, setProfileRole] = useState("Regular");

    const [clickedLogin, setClickedLogin] = useState(false);

    useEffect(() => {
        setShowLogin(false);
    }, [showRegister]);

    const registerUser = async (username, password, email, path) => {

        if (path === "")
            path = "https://via.placeholder.com/600";

        else
            path = "\\images\\ProfilePics\\" + path;

        const newUser = { username: username, password: password, email: email, path: path };

        try {
            const response = await api.post('/users/register', newUser);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        setShowRegister(false);
    }

    const [checkData, setCheckData] = useState(false);

    const loginUser = async (username, password) => {


        const newUser = { Username: username, Password: password };

        try {
            var response;
            response = await api.post(`/users/login?Username=${newUser.Username}&Password=${newUser.Password}`);
            setUserToken(response.data);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
        setClickedLogin(!clickedLogin);
        setShowLogin(!showLogin);
    }

    const fetchLoggedUser = async () => {

        try {
            var response = await api.get(`users/credentials`, {
                headers: {
                    'Authorization': `bearer ${userToken}`
                }
            });

            setProfileUsername(response.data.name);
            setProfileEmail(response.data.email)
            setProfileImagePath(response.data.path);
            setProfileRole(response.data.role);

        } catch (error) {
            console.log(`Error: ${error.message}`);
        }

        setClickedLogin(false);
        setIsUserLogged(true);
        props.setLoggedUser({username: response.data.name, email: response.data.email, path: response.data.path, role: response.data.role});
        props.setUserToken(userToken);

    }

    const logout = () => {
        setIsUserLogged(false);

        //DONT FORGET TO SET THE GLOBAL VALUES TO DEFAULT

        setProfileUsername("");
        setProfileEmail("")
        setProfileImagePath("");
        setProfileRole("");
        props.setLoggedUser({name: "", email: "", path: "", role: "Regular"});
        props.setUserToken("");
    }


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
                    </ul>

                    {!isUserLogged ? (
                        <>
                            <li className='nav-loginButton'>
                                <button id="loginBtn" onClick={() => setShowLogin(!showLogin)}>Login</button>
                            </li>
                        </>


                    ) : (
                        <li className='loggedUserProfileDetails' onClick={() => logout()}>
                            <img className='loggedUserProfileImage' src={profileImagePath}></img>
                            <h3 className='loggedUserUsername'>{profileUsername}</h3>
                        </li>
                    )}

                    {clickedLogin ? (
                        <div className='loginConfirm'>
                            <h2 className='loginConfirm-text'>Login Successful!</h2>
                            <button type='button' onClick={() => fetchLoggedUser()} className='loginConfirm-button'>OK</button>
                        </div>
                    ) : (
                        <>
                        </>
                    )}
                </nav>
            </div>

            {showLogin ? <LoginForm loginUser={loginUser} setShowRegister={setShowRegister} /> : <> </>}
            {showRegister ? <RegisterForm registerUser={registerUser} /> : <> </>}

        </>

    );
}

export default NavBar;
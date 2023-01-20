import React from 'react';
import { PersonPlus } from 'react-bootstrap-icons';
import { useState } from 'react';

const LoginForm = (props) => {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    return (
        <>
            <form className='loginForm' id='loginForm'>
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" value={username} onChange = {(e) => setUsername(e.target.value)} placeholder="Account Name" id="username" />

                <label for="password">Password</label>
                <input type="password" value={password} onChange = {(e) => setPassword(e.target.value)} placeholder="Password" id="password" />

                <button type='button' onClick={() => props.loginUser(username, password)}>Log In</button>
                <a onClick = {() => props.setShowRegister(true)}className='loginForm-registerLink'>New to ClutchCamp? Register Here!</a>
            </form>
        </>
    );
}

export default LoginForm;
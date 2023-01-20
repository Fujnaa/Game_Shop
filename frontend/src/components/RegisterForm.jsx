import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { Upload } from 'react-bootstrap-icons';

const RegisterForm = (props) => {

    const changeFileName = (name) => {
        var label = document.getElementById('profileImageLabel');
        label.innerHTML = name;
    }

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const[path, setPath] = useState("Choose a Profile Picture...");

    useEffect (() => {
        changeFileName(path);
    }, [path])


    return (


        <form className='registerForm' id='registerForm'>
            <h3>Registration</h3>

            <label for="username">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Account Name" id="username" />

            <label for="email">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" id="email" />

            <label for="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" />

            <input onChange={(e) => setPath(e.target.value.split('\\').pop())}className='registerForm-profileImage' type="file" id="registerForm-profileImage" />
            <label for="registerForm-profileImage" id='profileImageLabel'>Choose a Profile Picture...</label>

            <button type='button' onClick={(e) => props.registerUser(username, password, email, path)} className='registerForm-Button' id='registerForm-Button'> Register </button>
        </form>
    )
};

export default RegisterForm;
import React from 'react';

const LoginForm = () => {
    return (
        <>
            <form className='loginForm' id='loginForm'>
                <h3>Login Here</h3>

                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username" />

                <label for="password">Password</label>
                <input type="password" placeholder="Password" id="password" />

                <button>Log In</button>
            </form>
        </>
    );
}

export default LoginForm;
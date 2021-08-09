import { useState } from 'react'
import './LoginPage.css'

export const LoginPage = ({setUserName, setIsLoggedIn, history}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', login);

        setUserName(login)
        setIsLoggedIn(true)
        history.push('/')
    }

    return (
        <form className='login__page-form' onSubmit={handleLogin}>
            <h2>Avtorization</h2>
            <div className=''>
                <input onChange={handleLoginChange} className="login__page-input" type="text" placeholder="Login" required />                
            </div>
            <div>
                <input onChange={handlePasswordChange} className="password__page-input" type="password" placeholder="Password" required />    
            </div>
            <div>
                <button className="login__form-btn" type="submit">Log in</button>
            </div>
        </form>
    )
}
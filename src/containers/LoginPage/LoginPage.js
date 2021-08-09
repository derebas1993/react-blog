import './LoginPage.css'

export const LoginPage = (props) => {

    const handleLogin = (e) => {
        e.preventDefault()
        props.history.push('/')
    }

    return (
        <form className='login__page-form' onSubmit={handleLogin}>
            <h2>Avtorization</h2>
            <div className=''>
                <input className="login__page-input" type="text" placeholder="Login" required />                
            </div>
            <div>
                <input className="password__page-input" type="password" placeholder="Password" required />    
            </div>
            <div>
                <button className="login__form-btn" type="submit">Log in</button>
            </div>
        </form>
    )
}
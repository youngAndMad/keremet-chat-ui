import {useState} from "react";
import * as React from "react";
import './Login.scss'
import githubLogo from '@assets/images/logo/github.png'
import * as api from '@libs/api.ts'
import {createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login/')({
    component: Login
})

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // api.get('/api/v1/auth/me')
    //     .then(console.log)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        api.post('/api/v1/auth/login', {email, password})
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to KeremetChat</h1>
                <div className="social-login">
                    <a className="btn btn-block social-btn github" href={import.meta.env.VITE_GITHUB_AUTH_URL}>
                        <img src={githubLogo} alt="Github"/> Log in with Github</a>
                </div>
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <input type="email" name="email"
                               className="form-control" placeholder="Email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required/>
                    </div>
                    <div className="form-item">
                        <input type="password" name="password"
                               className="form-control" placeholder="Password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required
                        />
                    </div>
                    <div className="form-item">
                        <button type="submit" className="btn btn-block btn-primary">Login</button>
                    </div>
                </form>
                <span className="signup-link">New user? <Link to="/signup">Sign     up!</Link></span>
            </div>
        </div>
    )
}

export default Login;
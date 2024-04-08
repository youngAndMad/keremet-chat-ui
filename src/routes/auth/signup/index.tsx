import {createFileRoute, Link} from '@tanstack/react-router'
import {Button, Alert} from '@mui/material';
import githubLogo from '@assets/images/logo/github.png'
import React, {useState} from "react";
import './SignUp.scss'
import api from '@libs/api'
import OtpDialog from "@components/dialog/otp/OtpDialog.tsx";

export const Route = createFileRoute('/auth/signup/')({
    component: Signup
})

function Signup() {
    const [email, setEmail] = useState('') // convert to useForm
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        api.post('/api/v1/auth/register', {email, password, username})
            .then(() => setIsSubmitted(true))
            .catch(err => console.error(err))
    }

    function handleOTPSubmit(value: string) {
        console.log(value)
        setIsSubmitted(false)

        api.post('/api/v1/auth/confirm-email', {email, otp: value})
            .then(data => console.log(data))
    }

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="signup-title">Sign up to KeremetChat</h1>
                <div className="social-login">
                    <a className="btn btn-block social-btn github" href={import.meta.env.VITE_GITHUB_AUTH_URL}>
                        <img src={githubLogo} alt="Github"/> Sign up with Github
                    </a>
                </div>
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <input type="text" name="username"
                               className="form-control"
                               placeholder="Username"
                               required
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <input type="email" name="email"
                               className="form-control"
                               placeholder="Email"
                               required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <input type="password" name="password"
                               className="form-control" placeholder="Password"
                               required
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-item">
                        <Button type="submit">Sign up</Button>
                    </div>
                </form>
                {error && (
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
                {
                    isSubmitted && (
                        <OtpDialog handleCloseOTPDialog={() => setIsSubmitted(false)}
                                   handleOTPSubmit={handleOTPSubmit}
                                   isOpen={isSubmitted}
                        />
                    )
                }
                <span className="login-link">Already have an account? <Link to="/auth/login/">Login</Link></span>
            </div>
        </div>
    )
}
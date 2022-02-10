import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const funcSubmit = async (e) => {
        const URL = 'http://localhost:5000/api/auth/login';
        e.preventDefault();
        const responce = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        let json = await responce.json();
        if (responce.status === 200) {
            localStorage.setItem('authToken', json.authToken);
            navigate('/');
        }
        else {
            alert('Invalid Credential');
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form className='container my-5 ' onSubmit={funcSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" autoComplete='off' id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" autoComplete='off' className="form-control" id="exampleInputPassword1" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login

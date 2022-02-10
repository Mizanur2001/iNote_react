import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const navigate = useNavigate();

    const funcOnSubmitData = async (e) => {
        e.preventDefault();
        if (credentials.cpassword !== credentials.password) {
            return alert('confirm is not natched with the password');
        }

        const URL = `http://localhost:5000/api/auth/createuser`;
        const responce = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        let json = await responce.json();
        if (responce.status === 200) {
            localStorage.setItem('authToken', json.authToken);
            navigate('/');
        }
        else {
            alert('Enter a valid details');
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-4">
            <h3 className='mb-4'>SignUp</h3>
            <form onSubmit={funcOnSubmitData}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name </label>
                    <input type="text" autoComplete='off' className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} value={credentials.name} minLength={4} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" autoComplete='off' className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} value={credentials.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" autoComplete='off' className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} minLength={8} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" autoComplete='off' className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} minLength={8} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup

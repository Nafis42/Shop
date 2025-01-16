import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err,setErr]=useState('');

    const navigate=useNavigate();


    const handleRegister=async (e)=>{
        e.preventDefault();
        console.log('Registering with:', { username, fullname, email, password });

        try {
            const response = await axios.post('/api/users/register', {
                username,
                fullname,
                email,
                password,
            });
            if (response && response.data.success) {
                navigate("/login");
                console.log('Registration successful:', response.data);
              }
        } catch (error) {
            console.error('There was an error registering:', error);
            setErr(error.response.data.message);
        }

    }

  return (
    

    <>
      <div className='flex items-center justify-center bg-gray-100 min-h-screen'>
        <div className='bg-white p-6 rounded shadow-md w-80'>
            <h1 className='text-center text-2xl font-bold mb-4'>Register</h1>
            <form onSubmit={handleRegister} >
                <div className='mb-4'>
                    <label className="block text-gray-700" htmlFor="username">Username</label>
                    <input type="text" id='username' value={username} required 
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700" htmlFor="fullname">Fullname</label>
                    <input type="text" id='fullname' value={fullname} required
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className='mb-4'> 
                    <label className="block text-gray-700" htmlFor="email">Email</label>
                    <input type="email" id='email' value={email} required 
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700" htmlFor="password">Password</label>
                    <input type="password" id='password' value={password} required 
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
                </div>
                <button type="submit" 
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Register</button>
            </form>
            {err && <p className="text-red-500 text-center mt-2">{err}</p>}
            <p className="mt-4 text-center">
                Already Registered? <Link to={"/login"} className="text-blue-500 hover:underline">Click Here</Link>
            </p>
        </div>
      </div>
    </>
  )
}

export default Register

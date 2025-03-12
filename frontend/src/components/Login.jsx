import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { useSelector,useDispatch } from 'react-redux';
import {loginFailure,loginStart,loginSuccess,logout} from '../store/auth/authSlice'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {loading,error}=useSelector((state)=> state.auth);

    const handleLogin =async (e) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });
        dispatch(loginStart());
        try {
            const res=await axios.post('/api/users/login',{
                email,
                password
            })
            dispatch(loginSuccess(res.data));
            console.log("Logged in successfully",res.data);
            const userRole = res.data?.data?.user?.role;
            if (userRole === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
            // alert(error);
            // console.log(err);
            console.log("Some error in logingIN",error)
        }

    };
 

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                <p className="mt-4 text-center">
                    Not registered? <Link to={"/register"} className="text-blue-500 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    </>
  )
}

export default Login

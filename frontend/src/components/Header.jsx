import React from 'react'
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineLightMode } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { GrCart } from "react-icons/gr";

function Header() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLoginButton=()=>{
    navigate("/login");

  }
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to update Redux state
    navigate("/login"); // Optionally navigate to home after logout
};


  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
            <div className="flex items-center space-x-2">
                <AiOutlineShop className="text-2xl" /> {/* Add the icon here */}
                <div className="text-xl font-bold">Trendify</div>
            </div>
            <nav className="flex space-x-8">
                {/* <a href="#home" className="text-gray-700 hover:text-blue-500">Home</a>
                <a href="#about" className="text-gray-700 hover:text-blue-500">About</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-500">Contact</a> */}
                <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
                <Link to="#" className="text-gray-700 hover:text-blue-500">About</Link>
                <Link to="#" className="text-gray-700 hover:text-blue-500">Contact</Link>
            </nav>
            <div className="flex space-x-5 items-center ">
                {/* <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Shop Now</button> */}
                <button><MdOutlineLightMode className="text-2xl  hover:bg-gray-200 rounded-full " /></button>
                {/* <button onClick={handleLoginButton} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Login</button> */}
                {isAuthenticated ? (
                    <>
                        <GrCart className="text-2xl text-gray-700 hover:text-blue-500 cursor-pointer" />
                        <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Logout</button>
                        
                    </>
                ) : (
                    <button onClick={handleLoginButton} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Login</button>
                )}
            </div>
        </header>
    </>
  )
}

export default Header

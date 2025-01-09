import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="mb-4">© Copyright by Nafis 2025</p>
                <div className="flex justify-center space-x-4">
                    {/* <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500">
                        <FaGithub />
                    </a> */}
                    <Link className='text-white hover:text-blue-500'><FaFacebookF /></Link>
                    <Link className='text-white hover:text-blue-500'><FaInstagram /></Link>
                    <Link className='text-white hover:text-blue-500'><FaLinkedinIn /></Link>
                    <Link className='text-white hover:text-blue-500'><FaGithub /></Link>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer

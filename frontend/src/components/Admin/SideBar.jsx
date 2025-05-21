// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineFolderCopy } from "react-icons/md";

const SideBar = () => {
    return (
        <div className="w-1/6 p-6 bg-gray-800 text-white border-r border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin</h2>
            <ul className="space-y-4">
                <li>
                    <Link
                        to="create-category"
                        className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        <FiPlusCircle className="mr-2 text-xl" />
                        <span>Create Category</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="add-item"
                        className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        <FiPlusCircle className="mr-2 text-xl" />
                        <span>Add Items</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="list-items"
                        className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        <MdOutlineFolderCopy className="mr-2 text-xl" />
                        <span>List Items</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="orders"
                        className="flex items-center p-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out"
                    >
                        <MdOutlineFolderCopy className="mr-2 text-xl" />
                        <span>Orders</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;

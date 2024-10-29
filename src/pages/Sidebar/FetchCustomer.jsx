import React, { useEffect, useState } from 'react'
import { getAllCustomers } from '../../utils/APIFunction'
import { NavLink } from 'react-router-dom';
import { TiEyeOutline } from 'react-icons/ti';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import User1 from '../../assets/img/user1.png';


const FetchCustomer = () => {
    const [customer, setCustomer] = useState([])
    const [errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        fetchCustomer()
    }, [])

    const fetchCustomer = async () => {
        try {
            const result = await getAllCustomers()
            // console.log("Fetched customers:", result);
            setCustomer(result.userList)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return (
        <section className="p-8">
            <div>
                <h2 className="font-medium text-3xl">User Lists</h2>
            </div>
            <hr className="my-5" />

            {/* Display error message if fetch fails */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* list */}
            <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-5">S.N</th>
                            <th scope="col" className="px-6 py-5">Name</th>
                            <th scope="col" className="px-6 py-5">Email</th>
                            <th scope="col" className="px-6 py-5">Role</th>
                            <th scope="col" className="px-6 py-5">Photo</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customer && customer.length > 0 ? (
                            customer.map((user, index) => (
                                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4 capitalize">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4 capitalize">{user.role}</td>
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full">
                                            <img src={user.photo || User1} alt="User" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{user.phoneNumber}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-3">
                                            <NavLink to="#" className="font-medium text-indigo-500">
                                                <TiEyeOutline size={25} />
                                            </NavLink>
                                            <NavLink to={`/category/update/${user.id}`} className="font-medium text-green-500">
                                                <CiEdit size={25} />
                                            </NavLink>
                                            <button className="font-medium text-red-500">
                                                <MdOutlineDeleteOutline size={25} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default FetchCustomer
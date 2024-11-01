import React, { useState, useContext } from 'react'
import { addRoom, deleteRoom } from '../../utils/APIRoom'
import { Link } from "react-router-dom"; // Điều hướng quay lại danh sách phòng nếu cần
import { RoomContext } from '../../context/RoomContext';

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        roomType: "",
        roomSize: "",
        roomPrice: "",
        roomStatus: "Available",
        roomCapacity: "",
        roomAmount: "",
        roomDescription: "",
        roomPhotoURL: null
    })

    const [imageReview, setImageReview] = useState("")
    const [successMessage, setSuccessMassage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const { setFileName, fileName } = useContext(RoomContext);    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        
        // Chuyển đổi giá trị thành kiểu số nếu cần thiết
        if (name === "roomPrice") {
            value = parseFloat(value);
        }
        else if (name === "roomCapacity" || name === "roomAmount") {
            value = value ? parseInt(value) : value;
        }
        setNewRoom({ ...newRoom, [name]: value });
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({ ...newRoom, roomPhotoURL: selectedImage })
        setImageReview(URL.createObjectURL(selectedImage))
        setFileName(selectedImage.name); // Cập nhật tên file
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addRoom( newRoom)
            
            if (success !== undefined) {
                setSuccessMassage("A new room was added to the database")
                setNewRoom({ roomType: "", roomSize: "", roomPrice: "", roomStatus: "Available", roomCapacity: "", roomAmount: "", roomDescription: "", roomPhotoURL: null })
                setImageReview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding room")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    

    return (
        <section className="p-8">
            <div>
                <h2 className="font-medium text-3xl">Add New Room</h2>
            </div>
            <hr className="my-5" />
            <div className="flex justify-center">
                <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
                        <div>
                            <label htmlFor="status" className="block text-gray-700 font-medium">Room Status</label>
                            <input
                                name="roomStatus" // Thêm thuộc tính name
                                type="text"
                                value={newRoom.roomStatus}
                                onChange={handleRoomInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter room status"
                                required
                            />
                        </div>
                        

                        <div>
                            <label htmlFor="roomDescription" className="block text-gray-700 font-medium">Room Description</label>
                            <input
                                name="roomDescription" // Thêm thuộc tính name
                                type="text"
                                value={newRoom.roomDescription}
                                onChange={handleRoomInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter room description"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-gray-700 font-medium">Room Type</label>
                            <select
                                name="roomType" // Thêm thuộc tính name
                                value={newRoom.roomType}
                                onChange={handleRoomInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select room type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Suite">Suite</option>
                            </select>
                        </div>
                        
                        
                        <div>
                            <label htmlFor="roomAmount" className="block text-gray-700 font-medium">Room Amount</label>
                            <input
                                name="roomAmount" // Thêm thuộc tính name
                                type="number"
                                value={newRoom.roomAmount}
                                onChange={handleRoomInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter id"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="roomPrice" className="block text-gray-700 font-medium">Price (per night)</label>
                            <input
                                name="roomPrice" // Thêm thuộc tính name
                                type="number"
                                value={newRoom.roomPrice}
                                onChange={handleRoomInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter price"
                                required
                            />
                        </div>



                        <div>
                            <label htmlFor="roomSize" className="block text-gray-700 font-medium">Room Size</label>
                            <input
                                name="roomSize" 
                                type="text"
                                value={newRoom.roomSize}
                                onChange={handleRoomInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter size"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="roomCapacity" className="block text-gray-700 font-medium">Room capacity</label>
                            <input
                                name="roomCapacity" // Thêm thuộc tính name
                                type="text"
                                value={newRoom.roomCapacity}
                                onChange={handleRoomInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter room capacity"
                                required
                            ></input>
                        </div>

                        <div>
                            <label htmlFor="roomPhotoURL" className="block text-gray-700 font-medium">Upload Image</label>
                            <input
                                name="roomPhotoURL"
                                type="file"
                                onChange={handleImageChange}
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 py-6"
                                accept="image/*"
                                required
                            />
                            {fileName && ( // Hiển thị tên file nếu có
                                <p className="mt-2 text-gray-600">{fileName}</p>
                            )}
                            {imageReview && (
                                <img
                                    src={imageReview}
                                    alt="Room preview"
                                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                                    className="mt-3"
                                />
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <Link to="/admin/roomlist" className="text-accent hover:underline transition-all">
                                Back to room list
                            </Link>
                            <button
                                type="submit"
                                className="bg-accent text-white py-2 px-4 rounded-lg font-semibold hover:opacity-60 transition-all"
                            >
                                Add Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddRoom

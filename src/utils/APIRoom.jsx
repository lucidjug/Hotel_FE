import axios from "axios";

const token = localStorage.getItem('token');
export const api = axios.create({
    baseURL :"http://localhost:8080",
    headers: {
        'Authorization': `Bearer ${token}`,
    }
})


export async function addRoom(roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomSize", roomData.roomSize);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("roomStatus", roomData.roomStatus);
    formData.append("roomCapacity", roomData.roomCapacity);
    formData.append("roomAmount", roomData.roomAmount);
    formData.append("roomDescription", roomData.roomDescription);
    formData.append("file", roomData.roomPhotoURL);

    // Log các giá trị để kiểm tra
    console.log("roomType:", roomData.roomType);
    console.log("roomSize:", roomData.roomSize);
    console.log("roomPrice:", roomData.roomPrice);
    console.log("roomCapacity:", roomData.roomCapacity);
    console.log("roomAmount:", roomData.roomAmount);
    console.log("roomPhotoURL:", roomData.roomPhotoURL);

    try {
        // const token = localStorage.getItem('token'); // Lấy token từ localStorage
        const response = await api.post("/rooms", formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.status === 201;
    } catch (error) {
        console.error("Error adding room:", error);
        return false;
    }
}



export async function getAllRooms() {
    try {
        const token = localStorage.getItem('token');
        const result = await api.get("/rooms/get-all", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return result.data
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error("Authorization error: Access denied (403)");
        }
        throw new Error("Error fetching rooms");
    }
    
}

export async function deleteRoom(id) {
    try {
        const token = localStorage.getItem('token')
        const result = await api.delete(`/rooms/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return result.data
    } catch(error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

export async function updateRoom(RoomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType);
    formData.append("roomSize", roomData.roomSize);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("roomStatus", roomData.roomStatus);
    formData.append("roomCapacity", roomData.roomCapacity);
    formData.append("roomAmount", roomData.roomAmount);
    formData.append("roomDescription", roomData.roomDescription);
    formData.append("file", roomData.roomPhotoURL);
    const response = await api.put(`/rooms/${RoomId}`, formData,{
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return response
}

export async function getRoomById(roomId) {
    try{
        const token = localStorage.getItem('token')
        const result = await api.get(`/rooms/${roomId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return result.data
    } catch(error) {
        throw new Error (`Error fetching room ${error.message}`)
    }
}
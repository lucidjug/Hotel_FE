import axios from "axios";

export const api = axios.create({
    baseURL :"http://localhost:8080",
})



export async function getAllCustomers() {
    try {
        const token = localStorage.getItem('token');
        const result = await api.get("/users/get_all_customers", {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return result.data
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.error("Authorization error: Access denied (403)");
        }
        throw new Error("Error fetching customer");
    }
    
}
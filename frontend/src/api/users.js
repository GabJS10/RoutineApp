import { authAxi, axi } from "./useAxios";


export const updateDataUser = async (data) => {
    try {
        const response = await authAxi.put("/users/updateUser/", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const registerRequest = async (data) => {
    try {
        const response = await axi.post("/users/register/", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const loginRequest = async (data) => {
    try {
        const response = await axi.post("/users/login/", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
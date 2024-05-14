import axios from "axios";

const BASE_URL = "http://localhost:5000/"

export const getFormData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}survey/get-survey/663f0c1daa8c637f5b0d37e4`);
        return response.data[0];
    } catch (error) {
        console.error(error);
    }
}

export const updateFormData = async (data) => {
    try {
        const response = await axios.patch(`${BASE_URL}survey/update-survey/663f0c1daa8c637f5b0d37e4`, data);
        return response.data[0];
    } catch (error) {
        console.error(error);
    }
}
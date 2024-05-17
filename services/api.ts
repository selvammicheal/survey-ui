import axios from "axios";

const BASE_URL = "http://localhost:5000/"

export const getAllForms = async () => {
    try {
        const response = await axios.get(`${BASE_URL}survey/get-all-survey`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getFormData = async (survey_id) => {
    try {
        const response = await axios.get(`${BASE_URL}survey/get-survey/${survey_id}`);
        console.log(response,"response")
        return response.data[0];
    } catch (error) {
        console.error(error);
    }
}

export const createSurvey = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}survey/create-survey`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateFormData = async (data, survey_id) => {
    try {
        const response = await axios.patch(`${BASE_URL}survey/update-survey/${survey_id}`, data);
        return response.data[0];
    } catch (error) {
        console.error(error);
    }
}

export const createQuestion = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}question/create-question`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateQuestionData = async (data, question_id) => {
    try {
        const response = await axios.patch(`${BASE_URL}question/update-question/${question_id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateQuestionTypeData = async (question_type_id, question_id) => {
    try {
        const payload = {
            question_type_id: question_type_id
        }
        const response = await axios.patch(`${BASE_URL}question/update-question-type/${question_id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getAllQuestionType = async () => {
    try {
        const response = await axios.get(`${BASE_URL}question-type/get-all-question-type`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteQuestion = async (question_id) => {
    try {
        const response = await axios.delete(`${BASE_URL}question/delete-question/${question_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createSection = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}section/create-section`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateSectionData = async (data, section_id) => {
    try {
        const response = await axios.patch(`${BASE_URL}section/update-section/${section_id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteSectionData = async (section_id) => {
    try {
        const response = await axios.delete(`${BASE_URL}section/delete-section/${section_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
import { create } from "zustand";
import { QUESTION_TYPE, updateFormData, updateQuestion } from "./stateFunctions";

const useSection = create((set, get) => ({
    formData: {
        formName: "Untitled form",
        formDescription: "Form description",
        formHeadingActive: false,
        sections: [
            {
                questions: [
                    {
                        questionType: "short",
                        question: "Untitled Question",
                        questionImgSrc: "",
                        questionData: null,
                        active: true,
                        answer: ""
                    },
                ]
            }
        ]
    },
    updateFormData: (value, field) => updateFormData(value, field, set),
    updateQuestion: (field, value, sectionIndex, questionIndex) => {
        const updatedFormData = { ...get().formData };
        if(field === "questionType"){ 
            //updating active state for all ques to false
            updatedFormData.sections.map((section) => section.questions.map((x) => x.active = false));
            //updating the question data based on questionType
            updatedFormData.sections[sectionIndex].questions[questionIndex] = {...QUESTION_TYPE[value]};
        }
        updatedFormData.sections[sectionIndex].questions[questionIndex][field] = value;
        updateQuestion(set, updatedFormData);
    },
    updateActiveContent: (value, sectionIndex, questionIndex) => {
        const updatedFormData = { ...get().formData };
        updatedFormData.sections.map((section) => section.questions.map((x) => x.active = false))
        if(sectionIndex !== null){
            updatedFormData.sections[sectionIndex].questions[questionIndex].active = value;
        }
        updateQuestion(set, updatedFormData);
    },
    addNewQuestion: async(sectionIndex, questionIndex) => {
        console.log(sectionIndex, questionIndex, "questionIndex")
        const updatedFormData = { ...get().formData };
        await updatedFormData.sections.map((section) => section.questions.map((x) => x.active = false));
        const data = {...QUESTION_TYPE["short"]};
        if(questionIndex === null){
            updateFormData(false, "formHeadingActive", set)
            updatedFormData.sections[sectionIndex].questions.splice(questionIndex, 0, data);
        } else {
            updatedFormData.sections[sectionIndex].questions.splice(questionIndex + 1, 0, data);
        }
        updateQuestion(set, updatedFormData);
    }
}));

export default useSection;
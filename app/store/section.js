import { create } from "zustand";
import { QUESTION_TYPE, updateFormData, updateFormState } from "./stateFunctions";

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

    updateFormValue: (formData) => updateFormState(set, formData),

    updateQuestion: (field, value, sectionIndex, questionIndex) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        if (field === "questionType") {
            //reset question data when option is changed
            updatedFormData.sections[sectionIndex].questions[questionIndex] = { ...QUESTION_TYPE[value] };
        }
        updatedFormData.sections[sectionIndex].questions[questionIndex][field] = value;
        updateFormState(set, updatedFormData);
    },

    updateActiveContent: (value, sectionIndex, questionIndex) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        updatedFormData.sections.map((section) => section.questions.map((x) => x.active = false))
        if (sectionIndex !== null) {
            updatedFormData.sections[sectionIndex].questions[questionIndex].active = value;
        }
        updateFormState(set, updatedFormData);
    },

    addNewQuestion: (sectionIndex, questionIndex) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        const data = JSON.parse(JSON.stringify(QUESTION_TYPE["short"]));
        if (questionIndex === null) {
            updatedFormData.formHeadingActive = false;
            updatedFormData.sections[sectionIndex].questions.splice(0, 0, data);
        } else {
            updatedFormData.sections[sectionIndex].questions[questionIndex].active = false;
            updatedFormData.sections[sectionIndex].questions.splice(questionIndex + 1, 0, data);
        }
        updateFormState(set, updatedFormData);
    },

    updateOptions: (type, field, value, sectionIndex, questionIndex, optionIndex) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        if (type === "update") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.options[optionIndex][field] = value;
        } else if (type === "delete") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.options.splice(optionIndex, 1)
        } else if ("add") {
            let option = {
                name: `Option ${updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.options.length + 1}`,
                imgSrc: ""
            }
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.options.push(option)
        }
        updateFormState(set, updatedFormData);
    },

    updateLinearData: (field, value, sectionIndex, questionIndex) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        updatedFormData.sections[sectionIndex].questions[questionIndex].questionData[field] = value;
        updateFormState(set, updatedFormData);
    },

    updateRowColData: (type, field, value, sectionIndex, questionIndex, index) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        if (type === "rowData") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.rowData[index][field] = value;
        } else if (type === "colData") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.colData[index][field] = value;
        } else if (type === "addRow") {
            let data = {
                name: `Row ${updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.rowData.length + 1}`
            }
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.rowData.push(data)
        } else if (type === "addCol") {
            let data = {
                name: `Col ${updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.colData.length + 1}`
            }
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.colData.push(data)
        } else if (type === "removeRow") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.rowData.splice(index, 1)
        } else if (type === "removeCol") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].questionData.colData.splice(index, 1)
        }
        updateFormState(set, updatedFormData);
    }

}));

export default useSection;
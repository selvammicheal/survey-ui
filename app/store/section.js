import { create } from "zustand";
import { QUESTION_TYPE, SECTION, updateFormData, updateFormState } from "./stateFunctions";

const useSection = create((set, get) => ({
    formData: {
        formName: "Untitled form",
        formDescription: "Form description",
        formHeadingActive: false,
        sections: [
            {
                sectionTitle: null,
                sectionDesc: null,
                sectionActive: false,
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

    updateSectionData: (value, field, sectionIndex) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        updatedFormData.sections[sectionIndex][field] = value;
        updateFormState(set, updatedFormData);
    },

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

    updateActiveContent: ( sectionIndex, questionIndex, type) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));

        //updating active status to false for formHeader
        updatedFormData.formHeadingActive = false;
        //updating active status to false for questions
        updatedFormData.sections.map((section) => section.questions.map((x) => x.active = false));
        //updating active status to false for sections
        updatedFormData.sections.map((section) => section.sectionActive = false);
        
        if (type === "question") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].active = true;
        } else if (type === "formHeader") {
            updatedFormData.formHeadingActive = true;
        } else if (type === "section"){
            updatedFormData.sections[sectionIndex].sectionActive = true;
        }
        updateFormState(set, updatedFormData);
    },

    addNewSection: (sectionIndex, questionIndex, type) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        if (type === "formHeader") {
            updatedFormData.formHeadingActive = false;
            updatedFormData.sections.splice( 1, 0, JSON.parse(JSON.stringify(SECTION)));
        } else if (type === "section") {
            updatedFormData.sections[sectionIndex].sectionActive = false;
            updatedFormData.sections.splice(sectionIndex + 1, 0, JSON.parse(JSON.stringify(SECTION)));
        } else if (type === "question") {
            updatedFormData.sections[sectionIndex].questions[questionIndex].active = false;
            updatedFormData.sections.splice(sectionIndex + 1, 0, JSON.parse(JSON.stringify(SECTION)));
        }
        updateFormState(set, updatedFormData);
    },

    addNewQuestion: (type, sectionIndex, questionIndex, src) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        let data = {};
        if(type === "question"){
            data = JSON.parse(JSON.stringify(QUESTION_TYPE["short"]));
        } else if (type === "title"){
            data = JSON.parse(JSON.stringify(QUESTION_TYPE["title"]));
        } else if (type === "image"){
            data = JSON.parse(JSON.stringify(QUESTION_TYPE["image"]));
            data.questionImgSrc = src
        } else if (type === "video") {
            data = JSON.parse(JSON.stringify(QUESTION_TYPE["video"]));
            data.questionVideoSrc = src
        }
        if (questionIndex === null) {
            updatedFormData.formHeadingActive = false;
            updatedFormData.sections[sectionIndex].sectionActive = false;
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
    },

    deleteQuestion: (sectionIndex, questionIndex) => {
        const updatedFormData = JSON.parse(JSON.stringify(get().formData));
        if(updatedFormData.sections[sectionIndex].questions.length == 1){
            if(sectionIndex == 0) {
                updatedFormData.formHeadingActive = true;
            } else {
                updatedFormData.sections[sectionIndex].sectionActive = true;
            }
        } else {
            if(questionIndex == 0){
                updatedFormData.sections[sectionIndex].questions[questionIndex + 1].active = true;
            } else {
                updatedFormData.sections[sectionIndex].questions[questionIndex - 1].active = true;
            }
        }
        updatedFormData.sections[sectionIndex].questions.splice(questionIndex, 1);
        updateFormState(set, updatedFormData);
    }

}));

export default useSection;
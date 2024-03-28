export const updateFormData = (value, field, set) => {
    console.log("INSIDE",field,value)
    set((state) => (
        {
            formData: {
                ...state.formData,
                [field]: value
            }
        }
    ))
}

export const updateQuestion = (set, updatedFormData) => {
    set((state) => (
        {
            formData: {...updatedFormData}
        }
    ))
}

export const QUESTION_TYPE = {
    "short": {
        questionType: "short",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: null,
        active: true,
        answer: ""
    },
    "paragraph": {
        questionType: "paragraph",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: null,
        active: true,
        answer: ""
    },
    "multiple-choice": {
        questionType: "multiple-choice",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: {
            options: [
                {
                    name: "Option 1",
                    imgSrc: ""
                }
            ]
        },
        active: true,
        answer: ""
    },
    "checkboxes": {
        questionType: "checkboxes",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: {
            options: [
                {
                    name: "Option 1",
                    imgSrc: ""
                }
            ]
        },
        active: true,
        answer: ""
    },
    "dropdown": {
        questionType: "dropdown",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: {
            options: [
                {
                    name: "Option 1",
                    imgSrc: ""
                }
            ]
        },
        active: true,
        answer: ""
    },
    "linear": {
        questionType: "linear",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: {
            startIndex: 0,
            endIndex: 10,
            startLabel: "",
            endLabel: ""
        },
        active: true,
        answer: ""
    },
    "multiple-choice-grid": {
        questionType: "multiple-choice-grid",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: {
            rowData: [
                {
                    name: "Row 1"
                }
            ],
            colData: [
                {
                    name: "Row 1"
                }
            ],
        },
        active: true,
        answer: ""
    },
    "checkbox-grid": {
        questionType: "checkbox-grid",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: {
            rowData: [
                {
                    name: "Row 1"
                }
            ],
            colData: [
                {
                    name: "Row 1"
                }
            ],
        },
        active: true,
        answer: ""
    },
    "date": {
        questionType: "date",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: null,
        active: true,
        answer: ""
    },
    "time": {
        questionType: "time",
        question: "Untitled Question",
        questionImgSrc: "",
        questionData: null,
        active: true,
        answer: ""
    }
}
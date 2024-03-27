const Data = () => {


    const formData= {
        formName: "",
        formDescription: "",
        sections: [
            {
                questions: [
                    {
                        questionType: "shortAnswer",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: null,
                        answer: ""
                    },
                    {
                        questionType: "paragraph",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: null,
                        answer: ""
                    },
                    {
                        questionType: "multiple",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: {
                            options: [
                                {
                                    name: "abc",
                                    imgSrc: ""
                                }
                            ]
                        },
                        answer: ""
                    },
                    {
                        questionType: "checkbox",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: {
                            options: [
                                {
                                    name: "abc",
                                    imgSrc: ""
                                }
                            ]
                        },
                        answer: ""
                    },
                    {
                        questionType: "dropdown",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: {
                            options: [
                                {
                                    name: "abc",
                                    imgSrc: ""
                                }
                            ]
                        },
                        answer: ""
                    },
                    {
                        questionType: "linear",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: {
                            startIndex: 0,
                            endIndex: 10,
                            startLabel: "",
                            endLabel: ""
                        },
                        answer: ""
                    },
                    {
                        questionType: "multipleChoice",
                        question: "WHat is ypur name",
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
                        answer: ""
                    },
                    {
                        questionType: "checkboxGrd",
                        question: "WHat is ypur name",
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
                        answer: ""
                    },
                    {
                        questionType: "date",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: null,
                        answer: ""
                    },
                    {
                        questionType: "time",
                        question: "WHat is ypur name",
                        questionImgSrc: "",
                        questionData: null,
                        answer: ""
                    },
                ]
            }
        ]
    }

    return(
        <div></div>
    )
}
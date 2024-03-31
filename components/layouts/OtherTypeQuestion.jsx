import useSection from "@/app/store/section";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import FloatBar from "./FloatBar";

const OtherTypeQuestion = ({ questionData, questionIndex, sectionIndex }) => {

    const formData = useSection((state) => state.formData);
    const updateActiveContent = useSection((state) => state.updateActiveContent);
    const updateQuestion = useSection((state) => state.updateQuestion);
    const deleteQuestion = useSection((state) => state.deleteQuestion);

    const updateQuestionFunc = (value, field) => {
        updateQuestion(field, value, sectionIndex, questionIndex)
    }

    const updateActiveContentFunc = () => {
        updateActiveContent(sectionIndex, questionIndex, "question")
    }

    const deleteQuestionFunc = (e) => {
        e.stopPropagation();
        deleteQuestion(sectionIndex, questionIndex);
    }

    const renderQuestions = () => {
        switch (questionData?.questionType) {
            case "title": {
                return (
                    <>
                        <div className="row">
                            <div className="col-md-11">
                                <input
                                    type="text"
                                    className='text-light-color dark-text'
                                    value={questionData?.title}
                                    autoFocus={true}
                                    onChange={(e) => updateQuestionFunc(e.target.value, "title")}
                                />
                            </div>
                            <div className=" col-md-1 align-self-center" style={{cursor: "pointer"}} onClick={(e) => deleteQuestionFunc(e)}>
                                <div className="mainss">
                                    <DeleteOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input
                                    className="text-light-color"
                                    style={{ fontSize: "15px" }}
                                    type="text"
                                    placeholder="Description"
                                    value={questionData?.description}
                                    onChange={(e) => updateQuestionFunc(e.target.value, "description")}
                                />
                            </div>
                        </div>
                    </>
                )
            }
            case "image": {
                return(
                    <>
                        <div className="row">
                            <div className="col-md-11">
                                <input 
                                    type="text" 
                                    className='text-light-color dark-text' 
                                    placeholder="Image Title" 
                                    autoFocus={true} 
                                    value={questionData?.title} 
                                    onChange={(e) => updateQuestionFunc(e.target.value, "title")}
                                />
                            </div>
                            <div className="col-md-1 align-self-center" style={{cursor: "pointer"}} onClick={(e) => deleteQuestionFunc(e)}>
                                <div className="mainss">
                                    <DeleteOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="question-main-wrap">
                                    <img src={questionData?.questionImgSrc} className='mw-100' />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        }
    }

    const renderPreviews = () => {
        switch (questionData?.questionType) {
            case "title": {
                return (
                    <div className='w-100'>
                        <div className="question-heading ms-2 mb-2">
                            {questionData.title}
                        </div>
                        <div className="ms-2 mt-3 text-light-color" style={{ fontSize: "15px" }}>
                            {questionData.description ? questionData.description : "Description(optional)"
                            }
                        </div>
                    </div>
                )
            }
            case "image": {
                return(
                    <div className='w-100'>
                        <div className="question-heading ms-2 mb-2">
                            {questionData.title}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="question-main-wrap">
                                    <img src={questionData?.questionImgSrc} className='mw-100' />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <div className="main-form-heading">
            <div className={`main-form-wrap ${!questionData?.active && "left-border-0"}`} style={{ position: "relative" }} onClick={() => updateActiveContentFunc()}>
                {
                    questionData?.active ? renderQuestions() : renderPreviews()
                }
                {
                    (!formData?.formHeadingActive && questionData?.active) && <FloatBar sectionIndex={sectionIndex} questionIndex={questionIndex} clickedFrom={"question"}/>
                }
            </div>
        </div>
    )
}

export default OtherTypeQuestion;
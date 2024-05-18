import useSection from "../../app/store/section";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import FloatBar from "./FloatBar";
import { QUESTION_TYPE } from "../../app/utils/questionType.enum";
import { deleteQuestion, updateQuestionData } from "../../services/api";

const OtherTypeQuestion = ({ questionData, questionIndex, sectionIndex, formInfo, setFormInfo }) => {

    const activeContent = useSection((state) => state.activeContent);
    const updateActiveSlide = useSection((state) => state.updateActiveSlide);

    console.log(questionData,"questionDataquestionData")

    const updateQuestionFunc = async (value, field) => {
        
        if(field === "question" && value === "") value = null;

        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex][field] = value;
        setFormInfo(data);

        if (field === "question_img_src") return;

        // api-call 
        const updateQuestionPayload = {
            [field]: value
        }
        updateQuestionData(updateQuestionPayload, questionData?._id);
    }

    const changeActiveSlideOnDelete = () => {
        if(formInfo?.sections[sectionIndex].questions?.length == 1){
            if(sectionIndex == 0) {
                updateActiveSlide(null, null)
            } else {
                updateActiveSlide(sectionIndex, null)
            }
        } else {
            if(questionIndex == 0){
                updateActiveSlide(sectionIndex, questionIndex)
            } else {
                updateActiveSlide(sectionIndex, questionIndex - 1)
            }
        }
    }

    const deleteQuestionFunc = (e) => {
        e.stopPropagation();

        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions.splice(questionIndex,1);
        setFormInfo(data);

        // api-call 
        deleteQuestion(questionData?._id);
        
        changeActiveSlideOnDelete();
    }

    const renderQuestions = () => {
        switch (questionData?.question_type_id) {
            case QUESTION_TYPE.TITLE: {
                return (
                    <>
                        <div className="row">
                            <div className="col-md-11">
                                <input
                                    type="text"
                                    className='text-light-color dark-text'
                                    value={questionData?.question}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => updateQuestionFunc(e.target.value, "question")}
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
                                    onFocus={(e) => e.target.select()}
                                    value={questionData?.question_data}
                                    onChange={(e) => updateQuestionFunc(e.target.value, "question_data")}
                                />
                            </div>
                        </div>
                    </>
                )
            }
            case QUESTION_TYPE.IMAGE: {
                return(
                    <>
                        <div className="row">
                            <div className="col-md-11">
                                <input 
                                    type="text" 
                                    className='text-light-color dark-text' 
                                    placeholder="Image Title" 
                                    onFocus={(e) => e.target.select()}
                                    value={questionData?.question} 
                                    onChange={(e) => updateQuestionFunc(e.target.value, "question")}
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
                                    <img src={questionData?.question_data} className='mw-100' />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            case QUESTION_TYPE.VIDEO: {
                return(
                    <>
                        <div className="row">
                            <div className="col-md-11">
                                <input 
                                    type="text" 
                                    className='text-light-color dark-text' 
                                    placeholder="Image Title" 
                                    onFocus={(e) => e.target.select()}
                                    value={questionData?.question} 
                                    onChange={(e) => updateQuestionFunc(e.target.value, "question")}
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
                                    <video src={questionData?.question_data} controls className='mw-100' />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        }
    }

    const renderPreviews = () => {
        switch (questionData?.question_type_id) {
            case QUESTION_TYPE.TITLE: {
                return (
                    <div className='w-100'>
                        <div className="question-heading ms-2 mb-2">
                            {questionData?.question}
                        </div>
                        <div className="ms-2 mt-3 text-light-color" style={{ fontSize: "15px" }}>
                            {questionData?.question_data ? questionData.question_data : "Description(optional)"
                            }
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.IMAGE: {
                return(
                    <div className='w-100'>
                        <div className="question-heading ms-2 mb-2">
                            {questionData.question}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="question-main-wrap">
                                    <img src={questionData?.question_data} className='mw-100' />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.VIDEO: {
                return(
                    <div className='w-100'>
                        <div className="question-heading ms-2 mb-2">
                            {questionData.question}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="question-main-wrap">
                                    {/* <img src={questionData?.questionImgSrc} className='mw-100' /> */}
                                    <video src={questionData?.question_data} className='mw-100'></video>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    const activeQuestion = activeContent?.sectionIndex === sectionIndex && activeContent?.questionIndex === questionIndex;

    return (
        <div className="main-form-heading">
            <div className={`main-form-wrap ${!activeQuestion && "left-border-0"}`} style={{ position: "relative" }} onClick={() => updateActiveSlide(sectionIndex, questionIndex)}>
                {
                    activeQuestion ? renderQuestions() : renderPreviews()
                }
                {
                    activeQuestion && <FloatBar sectionIndex={sectionIndex} questionIndex={questionIndex} formInfo={formInfo} setFormInfo={setFormInfo}/>
                }
            </div>
        </div>
    )
}

export default OtherTypeQuestion;
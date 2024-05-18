import { CloseRounded, InsertPhotoOutlined } from "@mui/icons-material";
import { Radio } from "@mui/material";
import { useRef, useState } from "react";
import { updateQuestionData } from "../../services/api";

const MultipleChoice = ({question, sectionIndex, questionIndex, setFormInfo, formInfo}) => {

    const [imgIndex, setImgIndex] = useState();
    const inputRef = useRef();

    const updateMultipleChoice = (value, index, field) => {
        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data[index][field] = value;
        setFormInfo(data);

        if(field === "imgSrc") return;

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const removeMultipleChoice = (index) => {
       // update local state 
       const data = JSON.parse(JSON.stringify(formInfo));
       data.sections[sectionIndex].questions[questionIndex].question_data.splice(index, 1)
       setFormInfo(data);

       // api-call 
       const updateQuestionPayload = {
           question_data: data.sections[sectionIndex].questions[questionIndex].question_data
       }
       updateQuestionData(updateQuestionPayload, question?._id);
    }

    const addMultipleChoiceOption = () => {
        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        const questionInfo = data.sections[sectionIndex].questions[questionIndex].question_data
        questionInfo.push({name: `Option ${questionInfo.length+1}`, imgSrc: ""});
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: questionInfo
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const handleMultipleChoiceImg = (event) => {
        var fileName = event.target.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            updateMultipleChoice(URL.createObjectURL(event.target.files[0]), imgIndex, "imgSrc")
        }else{
            alert("Only jpg/jpeg and png files are allowed!");
        }   
    }

    const removeMultipleChoiceImg = (index) => {
        updateMultipleChoice("", index, "imgSrc")
    }

    return (
        <div>
            {
                question?.question_data?.map((x, i) => (
                    <div key={i}>
                        <div className="row">
                            <div className="col-md-10">
                                <div className='d-flex align-items-center mt-3'>
                                    <div className="multiple_option">
                                        <Radio
                                            checked={false}
                                            value="disabled"
                                            disabled
                                            name="radio-buttons"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <input type="text" name="name" className='text-light-color questionType' value={x.name} onChange={(e) => updateMultipleChoice(e.target.value, i, "name")} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 align-self-center">
                                <div className='upload-main-img' onClick={() => { inputRef?.current.click(); setImgIndex(i)}}>
                                    <InsertPhotoOutlined className="lightColor" />
                                </div>
                                <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={(e) => handleMultipleChoiceImg(e)} />
                            </div>
                            {
                                (i > 0 || question?.question_data?.length > 1) &&
                                <div className="col-md-1 align-self-center close-btn" onClick={() => removeMultipleChoice(i)}>
                                    <CloseRounded />
                                </div>
                            }
                        </div>
                        {
                            x.imgSrc &&
                            <div className="multiple-img-close ms-4 mt-3">
                                <div className="col-md-1 align-self-center close-btn" onClick={() => removeMultipleChoiceImg(i)}>
                                    <CloseRounded />
                                </div>
                                <img className="" style={{ height: "100px", width: "100px" }} src={x.imgSrc} alt="" />
                            </div>
                        }

                    </div>
                ))
            }
            <div className='d-flex align-items-end mt-3'>
                <div className="multiple_option">
                    <Radio
                        checked={false}
                        value="disabled"
                        disabled
                        name="radio-buttons"
                    />
                </div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => addMultipleChoiceOption()}>Add Option</div>
                </div>
            </div>
        </div>

    )
}

export default MultipleChoice
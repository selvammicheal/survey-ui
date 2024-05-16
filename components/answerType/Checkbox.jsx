import useSection from "../../app/store/section"
import CloseRounded from "@mui/icons-material/CloseRounded"
import InsertPhotoOutlined from "@mui/icons-material/InsertPhotoOutlined"
import { Checkbox, FormControlLabel } from "@mui/material"
import { useRef, useState } from "react"
import { FormGroup } from "react-bootstrap"
import { updateQuestionData } from "../../services/api"

const CheckBox = ({ question, sectionIndex, questionIndex, formInfo, setFormInfo }) => {

    const [imgIndex, setImgIndex] = useState();
    const inputRef = useRef();

    const updateCheckBox = (value, index, field) => {
        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data[index][field] = value;
        setFormInfo(data);

        if (field === "imgSrc") return;

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const removeCheckbox = (index) => {
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

    const addCheckbox = () => {
        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        const questionInfo = data.sections[sectionIndex].questions[questionIndex].question_data
        questionInfo.push({ name: `Option ${questionInfo.length + 1}`, imgSrc: "" });
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: questionInfo
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const handleCheckboxImg = (event) => {
        var fileName = event.target?.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            updateCheckBox(URL.createObjectURL(event.target.files[0]), imgIndex, "imgSrc")
        } else {
            alert("Only jpg/jpeg and png files are allowed!");
        }
    }

    const removeCheckboxImg = (index) => {
        updateCheckBox("", index, "imgSrc")
    }
    
    return (
        <>
            {
                question?.question_data?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="row">
                                <div className='col-md-10'>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className="multiple_option">
                                            <FormGroup>
                                                <FormControlLabel disabled control={<Checkbox />} />
                                            </FormGroup>
                                        </div>
                                        <div className='w-100'>
                                            <input type="text" name="name" className='text-light-color questionType' value={item.name} onChange={(e) => updateCheckBox(e.target.value, index, "name")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 align-self-center">
                                    <div className='upload-main-img' onClick={() => { inputRef?.current.click(); setImgIndex(index) }}>
                                        <InsertPhotoOutlined className="lightColor" />
                                    </div>
                                    <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={(e) => handleCheckboxImg(e)} />
                                </div>
                                {
                                    (index > 0 || question?.question_data?.length > 1) &&
                                    <div className="col-md-1 align-self-center close-btn" onClick={() => removeCheckbox(index)}>
                                        <CloseRounded />
                                    </div>
                                }
                            </div>
                            {
                                item.imgSrc &&
                                <div className="multiple-img-close">
                                    <div className="col-md-1 align-self-center close-btn" onClick={() => removeCheckboxImg(index)}>
                                        <CloseRounded />
                                    </div>
                                    <img className="mt-3 ms-4" style={{ height: "100px", width: "100px" }} src={item.imgSrc} alt="" />
                                </div>
                            }
                        </div>
                    )
                })

            }
            <div className='d-flex align-items-end mt-3'>
                <div className="multiple_option">
                    <FormGroup>
                        <FormControlLabel disabled control={<Checkbox />} />
                    </FormGroup>
                </div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => addCheckbox()}>Add Option</div>
                </div>
            </div>

        </>
    )
}
export default CheckBox;
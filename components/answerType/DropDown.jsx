import useSection from "../../app/store/section";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { updateQuestionData } from "../../services/api";

const DropDown = ({question, sectionIndex, questionIndex, formInfo, setFormInfo}) => {

    const updateDropdown = (value, index) => {
        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data[index].name = value;
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const dropDownRemoveValue = (index) => {
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

    const addDropdown = () => {
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

    return (
        <>
            {
                question?.question_data?.map((item, index) => (
                    <div className="row" key={index}>
                        <div className='col-md-11'>
                            <div className='d-flex align-items-center mt-3'>
                                <div className="multiple_option">{index + 1}.</div>
                                <div className='w-100'>
                                    <input type="text" name="name" className='text-light-color questionType' value={item.name} onChange={(e) => updateDropdown(e.target.value, index)} />
                                </div>
                            </div>
                        </div>
                        {
                            (index > 0 || question?.question_data?.length > 1) &&
                            <div className="col-md-1 align-self-center close-btn" onClick={() => dropDownRemoveValue(index)}>
                                <CloseRounded />
                            </div>
                        }
                    </div>
                ))
            }
            <div className='d-flex align-items-end mt-3'>
                <div className="multiple_option">{question?.question_data?.length + 1}.</div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => addDropdown()}>Add Option</div>
                </div>
            </div>
        </>
    )
}
export default DropDown;
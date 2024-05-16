import useSection from "../../app/store/section";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { Radio } from "@mui/material";
import { useState } from "react";
import { updateQuestionData } from "../../services/api";

const MultiChoiceGrid = ({question, sectionIndex, questionIndex, formInfo, setFormInfo}) => {

    const addRows = () => {
        const data = JSON.parse(JSON.stringify(formInfo));
        const row = {
            name: `Row ${question.question_data.rowData.length + 1}`
        }
        data.sections[sectionIndex].questions[questionIndex].question_data.rowData.push(row)
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const addColumns = () => {
        const data = JSON.parse(JSON.stringify(formInfo));
        const row = {
            name: `Col ${question.question_data.colData.length + 1}`
        }
        data.sections[sectionIndex].questions[questionIndex].question_data.colData.push(row)
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const removeRow = (index) => {
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data.rowData.splice(index, 1)
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const removeCol = (index) => {
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data.colData.splice(index, 1)
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const updateRow = (value, index) => {
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data.rowData[index].name = value;
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    const updateCol = (value, index) => {
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data.colData[index].name = value;
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }


    return (
        <div className="row">
            <div className="col-md-6">
                <div className="multipleHeading mt-2">Row</div>
                {
                    question?.question_data?.rowData.map((item, index) => (

                        <div className="row mt-2" key={index}>

                            <div className='d-flex align-items-center'>
                                <div className="multiple_option">{index + 1}.</div>
                                <div className='w-100'>
                                    <input type="text" name="name" onChange={(e) => updateRow(e.target.value, index)} value={item.name} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || question?.question_data?.rowData.length > 1) &&
                                    <div className="align-self-center close-btn" onClick={() => removeRow(index)}>
                                        <CloseRounded />
                                    </div>
                                }
                            </div>

                        </div>
                    ))
                }

                <div className='d-flex align-items-end mt-3'>
                    <div className="multiple_option">{question?.question_data?.rowData.length + 1}.</div>
                    <div className="w-100 ms-2">
                        <div className='add-option' onClick={() => addRows()}>Add Option</div>
                    </div>
                </div>

            </div>

            <div className="col-md-6">
                <div className="multipleHeading mt-2">Columns</div>
                {
                    question?.question_data?.colData.map((item, index) => (
                        <div className="row mt-2" key={index}>
                            <div className='d-flex align-items-center'>
                                <div className="multiple_option">
                                    <Radio
                                        checked={false}
                                        value="disabled"
                                        disabled
                                        name="radio-buttons"
                                    />
                                </div>
                                <div className="w-100">
                                    <input type="text" name="name" value={item.name} onChange={(e) => updateCol(e.target.value, index)} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || question?.question_data?.colData.length > 1) &&
                                    <div className="align-self-center close-btn" onClick={() => removeCol(index)}>
                                        <CloseRounded />
                                    </div>
                                }
                            </div>
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
                        <div className='add-option' onClick={() => addColumns()}>Add Option</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MultiChoiceGrid;
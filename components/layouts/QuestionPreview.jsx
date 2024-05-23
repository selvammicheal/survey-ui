import { Checkbox, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QUESTION_TYPE } from "../../app/utils/questionType.enum";
import dayjs from 'dayjs';

const QuestionPreview = ({ questionData, preview, surveyResponse, setSurveyResponse, missingIds }) => {

    let linearCount = questionData?.question_data?.startIndex == 0 ? questionData?.question_data?.endIndex + 1 : questionData?.question_data?.endIndex;

    const questionRes = surveyResponse?.find((x) => x.question_id == questionData._id);

    const updateSurveyResponse = (value = null, index = null, e = null) => {
        const responseData = JSON.parse(JSON.stringify(surveyResponse))
        const questionResponse = responseData?.find((x) => x.question_id === questionData?._id);

        const directTypeValue = [QUESTION_TYPE.SHORT_ANSWER, QUESTION_TYPE.PARAGRAPH, QUESTION_TYPE.LINEAR_SCALE, QUESTION_TYPE.DATE, QUESTION_TYPE.TIME];
        const optionTypeValue = [QUESTION_TYPE.MULTIPLE_CHOICE, QUESTION_TYPE.DROPDOWN];

        let userValue = null;
        if (directTypeValue.includes(questionData?.question_type_id)) {
            userValue = value === "" ? null : value;
        } else if (optionTypeValue.includes(questionData?.question_type_id)) {
            userValue = questionData.question_data[index]
        }else if (questionData?.question_type_id === QUESTION_TYPE.CHECKBOX) {
            let checkedValue = questionResponse?.question_response?.length > 0 ? JSON.parse(JSON.stringify(questionResponse?.question_response)) : [];

            if (e.target.checked) {
                checkedValue.push({...questionData.question_data[value], id: value})
            } else {
                checkedValue = checkedValue.filter((x) => x.id != value);
            }

            userValue = checkedValue.length > 0 ? checkedValue : null;

        } else if (questionData?.question_type_id === QUESTION_TYPE.MULTIPLE_CHOICE_GRID) {
            questionData.question_data.rowData = questionData.question_data.rowData.map((x) => ({
                ...x, checked: x?.checked ?? null
            }))
            questionData.question_data.rowData[index]["checked"] = value;
            userValue = questionData.question_data.rowData;
        } else if (questionData?.question_type_id === QUESTION_TYPE.CHECKBOX_GRID) {
            // add a property checked if it not present
            questionData.question_data.rowData?.map((x) => x["checked"] = x["checked"] ?? [])

            let checkedValue = questionData.question_data.rowData[index]["checked"];

            if (e.target.checked) {
                checkedValue = [...checkedValue, value];
            } else {
                checkedValue = checkedValue.filter((i) => i !== value);
            }

            questionData.question_data.rowData[index]["checked"] = checkedValue;
            //check if the response from user is empty
            const emptyResponse = questionData.question_data.rowData.every((x) => x.checked?.length == 0)
            userValue = emptyResponse ? null : questionData.question_data.rowData;

        }

        if (questionResponse) {
            questionResponse.question_response = userValue;
        } else {
            const response = {
                user_email: "abc@adglobal360.com",
                survey_id: questionData?.survey_id,
                section_id: questionData?.section_id,
                question_id: questionData?._id,
                question: questionData?.question,
                question_response: userValue
            }
            responseData.push(response);
        }
        const finalData = responseData.filter((x) => x.question_response != null)
        setSurveyResponse(finalData)

    }

    const renderQuestionPreview = () => {
        switch (questionData?.question_type_id) {
            case QUESTION_TYPE.SHORT_ANSWER: {
                return (
                    <div className='short-question'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field">
                            <input
                                value={questionRes?.question_response ?? ""}
                                type='text'
                                placeholder="Short answer text"
                                disabled={preview ? false : true}
                                onChange={(e) => updateSurveyResponse(e.target.value)}
                            />
                        </div>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.PARAGRAPH: {
                return (
                    <div className='short-question'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field">
                            <input
                                type='text'
                                value={questionRes?.question_response ?? ""}
                                placeholder="Long answer text"
                                disabled={preview ? false : true}
                                onChange={(e) => updateSurveyResponse(e.target.value)}
                            />
                        </div>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.MULTIPLE_CHOICE: {
                return (
                    <div className='short-question'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            {
                                questionData?.question_data?.map((option, index) => {
                                return(
                                    <div className="question-field" key={index}>
                                        <div className="row mt-2">
                                            <div className="col-md-10">
                                                <div className="d-flex align-items-center mt-1 ms-2">
                                                    <FormControlLabel control={<Radio value={option.name} checked={questionRes?.question_response?.name===option.name} disabled={preview ? false : true} />} label={option.name} onChange={() => updateSurveyResponse(null, index)} />
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            option.imgSrc && <img src={option.imgSrc} className='questionImage mt-3 ms-4' alt="" />
                                        }
                                    </div>
                                )})
                            }
                        </RadioGroup>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.CHECKBOX: {
                return (
                    <div className='short-question'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            questionData?.question_data.map((option, index) => (
                                <div className="question-field" key={index}>
                                    <div className="row mt-2">
                                        <div className="col-md-10">
                                            <div className="multiple_option my-2 ms-2">
                                                <FormControlLabel label={option.name} control={<Checkbox disabled={preview ? false : true} checked={questionRes?.question_response?.map((x)=>x.id)?.includes(index)} onChange={(e) => updateSurveyResponse(index,  null, e)} />} />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        option.imgSrc && <img src={option.imgSrc} className='questionImage mt-3 ms-4' alt="" />
                                    }
                                </div>
                            ))
                        }
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.DROPDOWN: {
                return (
                    <div className='short-question'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            preview ?
                                <div className="row">
                                    <div className="col-5 preview-dropdown">
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="icon-select-label"
                                                label="Icon Select"
                                                placeholder="Select"
                                                defaultValue={""}
                                                value={questionRes?.question_response?.name ?? "null"}
                                            >
                                                <MenuItem disabled value="null">
                                                    <span className="ms-3">Select</span>
                                                </MenuItem>
                                                {
                                                    questionData?.question_data?.map((option, index) => (
                                                        <MenuItem value={option.name} key={index} onClick={() => updateSurveyResponse(null, index)}>
                                                            <span className="ms-3">{option.name}</span>
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                :
                                questionData?.question_data?.map((option, index) => (

                                    <div className="question-field" key={index}>
                                        <div className="row mt-2">
                                            <div className="col-md-10">
                                                <div className='d-flex align-items-center mt-3 ms-2'>
                                                    <div className="multiple_option">
                                                        {index + 1}.
                                                    </div>
                                                    <div className="w-100 ms-2 multiple-choice">
                                                        {option.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.LINEAR_SCALE: {
                return (
                    <div className='short-questions'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="mt-2 d-flex justify-content-between mx-2 align-items-center">
                            <div className='me-4' style={{ fontSize: "15px", textAlign: "center", wordBreak: "break-word" }}>{questionData.question_data.startLabel}</div>
                            <RadioGroup
                                className="d-flex flex-row align-items-center text-center"
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                {
                                    [...Array(linearCount).keys()].map((x, index) => (
                                        <div className="d-flex flex-column align-items-center text-center" key={index}>
                                            <FormControlLabel
                                                control={<Radio value={index} disabled={preview ? false : true} checked={(questionRes?.question_response) == index +1} onClick={() => updateSurveyResponse(questionData?.question_data?.startIndex == 0 ? x : x + 1, null)} />}
                                                labelPlacement="top"
                                                label={questionData?.question_data?.startIndex == 0 ? x : x + 1}
                                            />
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                            <div className='ms-4' style={{ fontSize: "15px", textAlign: "center", wordBreak: "break-word" }}>{questionData.question_data.endLabel}</div>
                        </div>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.MULTIPLE_CHOICE_GRID: {
                return (
                    <div className='short-questions'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field">
                            <div className="row mt-4">
                                <div className="col-md-2">
                                    <div className='align-items-center'>
                                        <div className="multiple_option visible-hide ms-3 mt-2">
                                            Row
                                        </div>
                                        {
                                            questionData.question_data.rowData.map((x, index) => (
                                                <div className="multiple_option ms-3 mt-3" key={index}>
                                                    {x.name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-md-10 align-items-center">
                                    <div className='d-grid overflow-auto' style={{ whiteSpace: "nowrap" }}>
                                        <div className="d-flex justify-content-between align-items-center" >
                                            {
                                                questionData.question_data.colData.map((x, index) => (
                                                    <div className="d-flex flex-column align-items-center w-100" key={index}>
                                                        <div className="multiple_option mt-2">
                                                            {x.name}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {
                                            questionData.question_data.rowData.map((row, rowIndex) => (
                                                <RadioGroup
                                                    row
                                                    className="d-flex align-items-center justify-content-around w-100"
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {
                                                        questionData.question_data.colData.map((x, index) => (
                                                            <div className="multiple_option" style={{ marginTop: "14px" }} key={index}>
                                                                <Radio
                                                                    disabled={preview ? false : true}
                                                                    value={index}
                                                                    name="radio-buttons"
                                                                    onClick={() => updateSurveyResponse(index, rowIndex)}
                                                                    checked={row?.checked == index ? true : false }
                                                                />
                                                            </div>
                                                        ))
                                                    }
                                                </RadioGroup>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.CHECKBOX_GRID: {
                return (
                    <div className='short-questions'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field">
                            <div className="row mt-4">
                                <div className="col-md-2">
                                    <div className='align-items-center'>
                                        <div className="multiple_option visible-hide ms-3 mt-2">
                                            Row
                                        </div>
                                        {
                                            questionData.question_data.rowData.map((x, index) => (
                                                <div className="multiple_option ms-3 mt-3" key={index}>
                                                    {x.name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-md-10 align-items-center">
                                    <div className='d-grid overflow-auto' style={{ whiteSpace: "nowrap" }}>
                                        <div className="d-flex justify-content-between align-items-center" >
                                            {
                                                questionData.question_data.colData.map((x, index) => (
                                                    <div className="d-flex flex-column align-items-center w-100" key={index}>
                                                        <div className="multiple_option mt-2">
                                                            {x.name}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        {
                                            questionData.question_data.rowData.map((row, rowIndex) => (
                                                <div
                                                    className="d-flex align-items-center justify-content-around w-100"
                                                >
                                                    {
                                                        questionData.question_data.colData.map((x, index) => (
                                                            <div className="multiple_option" style={{ marginTop: "14px" }} key={index}>
                                                                <Checkbox checked={row?.checked ? row?.checked.includes(index) : false} disabled={preview ? false : true} onClick={(e) => updateSurveyResponse(index, rowIndex, e)} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.DATE: {
                return (
                    <div className='short-question'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field ms-2">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Month, day, year" value={(preview && questionRes?.question_response) ? dayjs(questionRes?.question_response) : null} disabled={preview ? false : true} onChange={(e) => updateSurveyResponse(dayjs(e).format('DD/MM/YYYY'), null)} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.TIME: {
                return (
                    <div className='short-question'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        {
                            questionData.question_img_src &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.question_img_src} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field ms-2">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker label="Time" value={(preview && questionRes?.question_response) ? dayjs(new Date(questionRes?.question_response)) : null} format="hh:mm A" disabled={preview ? false : true} onChange={(e) => updateSurveyResponse(e.format(), null)} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        {
                            missingIds?.includes(questionData?._id) ? 
                                <div className="error-field">This is a required field</div> : <></>
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.TITLE: {
                return (
                    <div className='w-100'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
                            {questionData.question}
                        </div>
                        <div className="ms-2 mt-3 text-light-color" style={{ fontSize: "15px" }}>
                            {questionData.description ? questionData.description : "Description(optional)"}
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.IMAGE: {
                return (
                    <div className='w-100'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
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
                return (
                    <div className='w-100'>
                        <div className={`question-heading ms-2 mb-3 ${questionData?.mandatory ? "required" : ""}`}>
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

    return (
        <>
            {
                renderQuestionPreview()

            }
        </>
    )
}

export default QuestionPreview;
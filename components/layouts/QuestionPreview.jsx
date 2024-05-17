import { Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QUESTION_TYPE } from "../../app/utils/questionType.enum";

const QuestionPreview = ({ questionData, preview }) => {

    console.log(questionData, "questionData")
    let linearCount = questionData?.question_data?.startIndex == 0 ? questionData?.question_data?.endIndex + 1 : questionData?.question_data?.endIndex

    const renderQuestionPreview = () => {
        switch (questionData?.question_type_id) {
            case QUESTION_TYPE.SHORT_ANSWER: {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
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
                            <input type='text' placeholder="Short answer text" disabled={preview ? false : true} />
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.PARAGRAPH: {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
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
                            <input type='text' placeholder="Long answer text" disabled={preview ? false : true} />
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.MULTIPLE_CHOICE: {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
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
                                questionData?.question_data?.map((option, index) => (
                                    <div className="question-field" key={index}>
                                        <div className="row mt-2">
                                            <div className="col-md-10">
                                                <div className="d-flex align-items-center mt-1 ms-2">
                                                    <FormControlLabel control={<Radio value={option.name} disabled={preview ? false : true} />} label={option.name} />
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            option.imgSrc && <img src={option.imgSrc} className='questionImage mt-3 ms-4' alt="" />
                                        }
                                    </div>
                                ))
                            }
                        </RadioGroup>
                    </div>
                )
            }
            case QUESTION_TYPE.CHECKBOX: {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
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
                                                <FormControlLabel label={option.name} control={<Checkbox disabled={preview ? false : true} />} />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        option.imgSrc && <img src={option.imgSrc} className='questionImage mt-3 ms-4' alt="" />
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }
            case QUESTION_TYPE.DROPDOWN: {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
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
                                                defaultValue={questionData?.question_data[0]?.name}
                                            >
                                                {
                                                    questionData?.question_data?.map((option, index) => (
                                                        <MenuItem value={option.name} key={index}>
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
                    </div>
                )
            }
            case QUESTION_TYPE.LINEAR_SCALE: {
                return (
                    <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
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
                                            control={<Radio value={index} disabled={preview ? false : true} />} 
                                            labelPlacement="top" 
                                            label={questionData?.question_data?.startIndex == 0 ? x : x + 1}
                                        />
                                    </div>
                                ))
                            }
                            </RadioGroup>
                            <div className='ms-4' style={{ fontSize: "15px", textAlign: "center", wordBreak: "break-word" }}>{questionData.question_data.endLabel}</div>
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.MULTIPLE_CHOICE_GRID: {
                return (
                    <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
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
                                        <div className="multiple_option visible-hide ms-3">
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
                                                        <div className="multiple_option">
                                                            {x.name}
                                                        </div>
                                                        {
                                                            questionData.question_data.rowData.map((x, index) => (
                                                                <div className="multiple_option mt-3 " key={index}>
                                                                    <Radio
                                                                        disabled={preview ? false : true}
                                                                        value="disabled"
                                                                        name="radio-buttons"
                                                                    />
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
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.CHECKBOX_GRID: {
                return (
                    <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
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
                                        <div className="multiple_option visible-hide ms-3">
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
                                                        <div className="multiple_option">
                                                            {x.name}
                                                        </div>
                                                        {
                                                            questionData.question_data.rowData.map((x, index) => (
                                                                <div className="multiple_option mt-3 " key={index}>
                                                                    <Checkbox disabled={preview ? false : true} />
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
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.DATE: {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
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
                                    <DatePicker label="Month, day, year" disabled={preview ? false : true} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                )
            }
            case QUESTION_TYPE.TIME: {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
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
                                    <TimePicker label="Time" disabled={preview ? false : true} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                )
            }
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
                return (
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
            case "video": {
                return (
                    <div className='w-100'>
                        <div className="question-heading ms-2 mb-2">
                            {questionData.title}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="question-main-wrap">
                                    {/* <img src={questionData?.questionImgSrc} className='mw-100' /> */}
                                    <video src={questionData?.questionVideoSrc} className='mw-100'></video>
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
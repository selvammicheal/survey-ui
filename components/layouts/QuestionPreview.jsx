import { Checkbox, FormControl, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select } from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const QuestionPreview = ({ questionData, preview }) => {

    let linearCount = questionData?.questionData?.startIndex == 0 ? questionData?.questionData?.endIndex + 1 : questionData?.questionData?.endIndex

    const renderQuestionPreview = () => {
        switch (questionData?.questionType) {
            case "short": {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
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
            case "paragraph": {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
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
            case "multiple-choice": {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            questionData?.questionData?.options.map((option, index) => (
                                <div className="question-field">
                                    <div className="row mt-2">
                                        <div className="col-md-10">
                                            <div className="d-flex align-items-center mt-1">
                                                <FormControlLabel control={<Radio disabled={preview ? false : true} />} label={option.name} />
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
            case "checkboxes": {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            questionData?.questionData?.options.map((option, index) => (
                                <div className="question-field">
                                    <div className="row mt-2">
                                        <div className="col-md-10">
                                            <div className="multiple_option my-2">
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
            case "dropdown": {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
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
                                        defaultValue= {questionData?.questionData?.options[0].name}
                                    >
                                        {
                                            questionData?.questionData?.options.map((option, index) => (
                                                <MenuItem value={option.name}>
                                                    <span className="ms-3">{option.name}</span>
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                </div>
                            </div>
                                :
                                questionData?.questionData?.options.map((option, index) => (

                                    <div className="question-field">
                                        <div className="row mt-2">
                                            <div className="col-md-10">
                                                <div className='d-flex align-items-center mt-3'>
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
            case "linear": {
                return (
                    <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="mt-2 d-flex justify-content-between mx-2 align-items-center">
                            <div className='me-4' style={{ fontSize: "15px", textAlign: "center", wordBreak: "break-word" }}>{questionData.questionData.startLabel}</div>
                            {
                                [...Array(linearCount).keys()].map((x) => (
                                    <div className="d-flex flex-column align-items-center  text-center">
                                        <div className="mb-2">
                                            {questionData?.questionData?.startIndex == 0 ? x : x + 1}
                                        </div>
                                        <div className="">
                                            <Radio disabled={preview ? false : true} />
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='ms-4' style={{ fontSize: "15px", textAlign: "center", wordBreak: "break-word" }}>{questionData.questionData.endLabel}</div>
                        </div>
                    </div>
                )
            }
            case "multiple-choice-grid": {
                return (
                    <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
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
                                            questionData.questionData.rowData.map((x) => (
                                                <div className="multiple_option ms-3 mt-3">
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
                                                questionData.questionData.colData.map((x) => (
                                                    <div className="d-flex flex-column align-items-center w-100">
                                                        <div className="multiple_option">
                                                            {x.name}
                                                        </div>
                                                        {
                                                            questionData.questionData.rowData.map((x) => (
                                                                <div className="multiple_option mt-3 ">
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
            case "checkbox-grid": {
                return (
                    <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
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
                                            questionData.questionData.rowData.map((x) => (
                                                <div className="multiple_option ms-3 mt-3">
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
                                                questionData.questionData.colData.map((x) => (
                                                    <div className="d-flex flex-column align-items-center w-100">
                                                        <div className="multiple_option">
                                                            {x.name}
                                                        </div>
                                                        {
                                                            questionData.questionData.rowData.map((x) => (
                                                                <div className="multiple_option mt-3 ">
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
            case "date": {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Month, day, year" disabled={preview ? false : true} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                )
            }
            case "time": {
                return (
                    <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            {questionData.question}
                        </div>
                        {
                            questionData.questionImgSrc &&
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="question-main-wrap">
                                        <img src={questionData?.questionImgSrc} className='mw-100' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="question-field">
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
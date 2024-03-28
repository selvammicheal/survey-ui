
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Switch from '@mui/material/Switch';
import { MenuItem, Select, FormControl, InputLabel, Radio, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';
import AdjustSharpIcon from '@mui/icons-material/AdjustSharp';
import ReorderSharpIcon from '@mui/icons-material/ReorderSharp';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useRef, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers';
import LinearScale from '../answerType/LinearScale';
import MultiChoiceGrid from '../answerType/MultiChoiceGrid';
import CheckBoxGrid from '../answerType/CheckBoxGrid';
import MultipleChoice from '../answerType/MultipleChoice';
import CheckBox from '../answerType/Checkbox';
import DropDown from '../answerType/DropDown';
import FloatBar from './FloatBar';
import useSection from '@/app/store/section';

const Question = ({ questionData, questionIndex, sectionIndex }) => {

    const inputRef = useRef();

    const updateQuestion = useSection((state) => state.updateQuestion);
    const updateActiveContent = useSection((state) => state.updateActiveContent);
    const updateFormData = useSection((state) => state.updateFormData);
    const formData = useSection((state) => state.formData);

    const updateQuestionFunc = (value) => {
        updateQuestion("question", value, sectionIndex, questionIndex)
    }

    const handleChange = (e) => {
        updateQuestion("questionImgSrc", URL.createObjectURL(e.target.files[0]), sectionIndex, questionIndex)
    }

    const updateQuestionType = (value) => {
        updateQuestion("questionType", value, sectionIndex, questionIndex)
    }

    const updateActiveContentFunc = () => {
        updateFormData(false, "formHeadingActive");
        updateActiveContent(true, sectionIndex, questionIndex)
    }

    console.log(questionData,'questionData')

    const renderAnswerType = () => {
        switch (questionData?.questionType) {
            case "short":
                return (
                    <div className="col-md-6 mb-5">
                        <input type="text" name="name" className='text-light-color questionType' value="Short answer text" disabled />
                    </div>
                )
            case "paragraph":
                return (
                    <div className="col-md-7 mb-5">
                        <input type="text" name="name" className='text-light-color questionType' value="Long answer text" disabled />
                    </div>
                )
            case "multiple-choice":
                return <MultipleChoice questionData={questionData} sectionIndex={sectionIndex} questionIndex={questionIndex}/>

            case "checkboxes":
                return <CheckBox questionData={questionData} sectionIndex={sectionIndex} questionIndex={questionIndex}/>

            case "dropdown":
                return <DropDown questionData={questionData} sectionIndex={sectionIndex} questionIndex={questionIndex}/>

            case "date":
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Month, day, year" disabled={true} />
                        </DemoContainer>
                    </LocalizationProvider>
                )

            case "time":
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Time" disabled={true} />
                        </DemoContainer>
                    </LocalizationProvider>
                )
            case "linear":
                return <LinearScale questionData={questionData} sectionIndex={sectionIndex} questionIndex={questionIndex}/>

            case "multiple-choice-grid":
                return <MultiChoiceGrid questionData={questionData} sectionIndex={sectionIndex} questionIndex={questionIndex}/>

            case "checkbox-grid":
                return <CheckBoxGrid questionData={questionData} sectionIndex={sectionIndex} questionIndex={questionIndex}/>
        }

    }

    let linearCount = questionData?.questionData?.startIndex == 0 ? questionData?.questionData?.endIndex + 1 : questionData?.questionData?.endIndex

    return (
        <div className="main-form-haeding">
            <div className={`main-form-wrap ${!questionData?.active && "left-border-0"}`} style={{ position: "relative" }} onClick={() => updateActiveContentFunc()}>
                <>
                    {questionData?.active &&
                        <>
                            <div className="row">
                                <div className="col-md-7">
                                    <input type="text" name="name" className='text-light-color dark-text' autoFocus={true} value={questionData.question} onChange={(e) => updateQuestionFunc(e.target.value)} />
                                </div>
                                <div className="col-md-1 align-self-center">
                                    <div className='upload-main-img' onClick={() => inputRef?.current.click()}>
                                        <InsertPhotoOutlinedIcon className="ligthColor uploadimg" />
                                    </div>
                                    <input type="file" className='hiden-file' ref={inputRef} onChange={handleChange} />
                                </div>
                                <div className="col-md-4">
                                    <div className="optionBar">
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="icon-select-label"
                                                defaultValue="short"
                                                label="Icon Select"
                                                value={questionData.questionType}
                                                onChange={(e) => updateQuestionType(e.target.value)}
                                            >
                                                <MenuItem value="short">
                                                    <ShortTextIcon />
                                                    <span className="ms-3">Short answer</span>
                                                </MenuItem>
                                                <MenuItem value="paragraph">
                                                    <ReorderSharpIcon />
                                                    <span className="ms-3">Paragraph</span>
                                                </MenuItem>
                                                <hr />
                                                <MenuItem value="multiple-choice">
                                                    <AdjustSharpIcon />
                                                    <span className="ms-3">Multiple choice</span>
                                                </MenuItem>
                                                <MenuItem value="checkboxes">
                                                    <CheckBoxOutlinedIcon />
                                                    <span className="ms-3">Checkboxes</span>
                                                </MenuItem>
                                                <MenuItem value="dropdown">
                                                    <ArrowDropDownCircleOutlinedIcon />
                                                    <span className="ms-3">Dropdown</span>
                                                </MenuItem>
                                                <hr />
                                                <MenuItem value="linear">
                                                    <LinearScaleOutlinedIcon />
                                                    <span className="ms-3">Linear scale</span>
                                                </MenuItem>
                                                <MenuItem value="multiple-choice-grid">
                                                    <DragIndicatorOutlinedIcon />
                                                    <span className="ms-3">Multiple choice grid</span>
                                                </MenuItem>
                                                <MenuItem value="checkbox-grid">
                                                    <AppsOutlinedIcon />
                                                    <span className="ms-3">Checkbox grid</span>
                                                </MenuItem>
                                                <hr />
                                                <MenuItem value="date">
                                                    <InsertInvitationOutlinedIcon />
                                                    <span className="ms-3">Date</span>
                                                </MenuItem>
                                                <MenuItem value="time">
                                                    <AccessTimeOutlinedIcon />
                                                    <span className="ms-3">Time</span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            {
                                questionData?.questionImgSrc &&
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="questionmain-wrap">
                                            <img src={questionData?.questionImgSrc} className='questionImage' />
                                            <div className="question-setting" id='basic-button'>
                                                <MoreVertIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className='mb-4'>
                                {
                                    (renderAnswerType())
                                }
                            </div>

                            <hr />

                            <div className="questionSettings">
                                <div className="d-flex justify-content-end" style={{gap:"0px 25px"}}>
                                    <div className="text-center align-self-center" onClick={() => console.log("clicked.........")}>
                                        <ContentCopyRoundedIcon className="ligthColor" />
                                    </div>
                                    <div className="align-self-center text-center ">
                                        <DeleteOutlinedIcon className="ligthColor" />
                                    </div>
                                    <div className="question-line"></div>
                                    <div className="">
                                        <span>Required</span>
                                        <Switch />
                                    </div>
                                </div>
                            </div>
                        </>
                    }


                    {
                        (!questionData?.active && questionData?.questionType === "short") &&
                        <div className='short-question'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            <div className="question-field">
                                <input type='text' value={"Short answer text"} disabled={true} />
                            </div>
                        </div>
                    }

                    {
                        (!questionData?.active && questionData?.questionType === "paragraph") &&
                        <div className='short-question'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            <div className="question-field">
                                <input type='text' value={"Long answer text"} disabled={true} />
                            </div>
                        </div>
                    }

                    {
                        (!questionData?.active && questionData?.questionType === "multiple-choice") &&
                        <div className='short-question'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            {
                                questionData?.questionData?.options.map((option, index) => (
                                    <div className="question-field">
                                        <div className="row mt-2">
                                            <div className="col-md-10">
                                                <div className='d-flex align-items-center mt-3'>
                                                    <div className="mutiple_option">
                                                        <Radio
                                                            checked={false}
                                                            value="disabled"
                                                            disabled
                                                            name="radio-buttons"
                                                        />
                                                    </div>
                                                    <div className="w-100 ms-2 multiple-choice">
                                                        {option.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img src={option.imgSrc} className='questionImage mt-3 ms-4' alt="" />
                                    </div>
                                ))
                            }
                        </div>
                    }

                    {
                        (!questionData?.active && questionData?.questionType === "checkboxes") &&
                        <div className='short-question'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            {
                                questionData?.questionData?.options.map((option, index) => (
                                    <div className="question-field">
                                        <div className="row mt-2">
                                            <div className="col-md-10">
                                                <div className='d-flex align-items-center mt-3'>
                                                    <div className="mutiple_option">
                                                        <FormGroup>
                                                            <FormControlLabel disabled control={<Checkbox />} />
                                                        </FormGroup>
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
                    }


                    {
                        (!questionData?.active && questionData?.questionType === "dropdown") &&

                        <div className='short-question'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            {
                                questionData?.questionData?.options.map((option, index) => (

                                    <div className="question-field">
                                        <div className="row mt-2">
                                            <div className="col-md-10">
                                                <div className='d-flex align-items-center mt-3'>
                                                    <div className="mutiple_option">
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
                    }

                    {
                        (!questionData?.active && questionData?.questionType === "linear") &&
                        <div className='short-questions'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            <div className="mt-2 d-flex justify-content-between mx-4 align-items-center">
                                <div className='mx-2'>{questionData.questionData.startLabel}</div>
                                {
                                    [...Array(linearCount).keys()].map((x) => (
                                        <div className="d-flex flex-column align-items-center  text-center">
                                            <div className="mb-2">
                                                {questionData?.questionData?.startIndex == 0 ? x : x + 1}
                                            </div>
                                            <div className="">
                                                <Radio
                                                    checked={false}
                                                    value="disabled"
                                                    disabled
                                                    name="radio-buttons"
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className='mx-2'>{questionData.questionData.endLabel}</div>
                            </div>
                        </div>
                    }

                    {
                        (!questionData?.active && questionData?.questionType === "multiple-choice-grid") &&
                        <div className='short-questions'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            <div className="question-field">
                                <div className="row mt-4">
                                    <div className="col-md-2">
                                        <div className='align-items-center'>
                                            <div className="mutiple_option visible-hide ms-3">
                                                Row
                                            </div>
                                            {
                                                questionData.questionData.rowData.map((x) => (
                                                    <div className="mutiple_option ms-3 mt-3">
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
                                                            <div className="mutiple_option">
                                                                {x.name}
                                                            </div>
                                                            {
                                                                questionData.questionData.rowData.map((x) => (
                                                                    <div className="mutiple_option mt-3 ">
                                                                        <Radio
                                                                            checked={false}
                                                                            value="disabled"
                                                                            disabled
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
                    }

                    {
                        (!questionData?.active && questionData?.questionType === "checkbox-grid") &&

                        <div className='short-questions'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            <div className="question-field">
                                <div className="row mt-4">
                                    <div className="col-md-2">
                                        <div className='align-items-center'>
                                            <div className="mutiple_option visible-hide ms-3">
                                                Row
                                            </div>
                                            {
                                                questionData.questionData.rowData.map((x) => (
                                                    <div className="mutiple_option ms-3 mt-3">
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
                                                            <div className="mutiple_option">
                                                                {x.name}
                                                            </div>
                                                            {
                                                                questionData.questionData.rowData.map((x) => (
                                                                    <div className="mutiple_option mt-3 ">
                                                                        <FormGroup>
                                                                            <FormControlLabel disabled control={<Checkbox />} />
                                                                        </FormGroup>
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
                    }


                    {
                        (!questionData?.active && questionData?.questionType === "date") &&
                        <div className='short-question'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            <div className="question-field">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Month, day, year" disabled={true} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                    }

                    {
                        (!questionData?.active && questionData?.questionType === "time") &&

                        <div className='short-question'>
                            <div className="question-heading ms-2 mb-3">
                                {questionData.question}
                            </div>
                            <div className="question-field">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['TimePicker']}>
                                        <TimePicker label="Time" disabled={true} />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </div>
                        </div>
                    }




                </>
                {
                    (!formData?.formHeadingActive && questionData?.active) && <FloatBar sectionIndex={sectionIndex} questionIndex={questionIndex} />
                }
            </div>
        </div>
    )
}

export default Question;
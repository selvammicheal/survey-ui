
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Switch from '@mui/material/Switch';
import { MenuItem, Select, FormControl } from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';
import AdjustSharpIcon from '@mui/icons-material/AdjustSharp';
import ReorderSharpIcon from '@mui/icons-material/ReorderSharp';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRef } from 'react';
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
import QuestionPreview from './QuestionPreview';
import CloseRounded from '@mui/icons-material/CloseRounded';

const Question = ({ questionData, questionIndex, sectionIndex }) => {

    const inputRef = useRef();

    const updateQuestion = useSection((state) => state.updateQuestion);
    const updateActiveContent = useSection((state) => state.updateActiveContent);
    const formData = useSection((state) => state.formData);
    const deleteQuestion = useSection((state) => state.deleteQuestion);

    console.log(formData, "formData")

    const updateQuestionFunc = (value) => {
        updateQuestion("question", value, sectionIndex, questionIndex)
    }

    const handleChange = (e) => {
        var fileName = e.target.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
            updateQuestion("questionImgSrc", URL.createObjectURL(e.target.files[0]), sectionIndex, questionIndex)
        } else {
            alert("Only jpg/jpeg and png files are allowed!");
        }
    }

    const updateQuestionType = (value) => {
        updateQuestion("questionType", value, sectionIndex, questionIndex)
    }

    const updateActiveContentFunc = () => {
        updateActiveContent(sectionIndex, questionIndex, "question")
    }

    const deleteQuestionFunc = (e) => {
        e.stopPropagation();
        deleteQuestion(sectionIndex, questionIndex);
    }
    const removeQuestionImg = () => {
        updateQuestion("questionImgSrc", null, sectionIndex, questionIndex)
    }
    const renderAnswerType = () => {
        switch (questionData?.questionType) {
            case "short": {
                return (
                    <div className="col-md-6 mb-5">
                        <input
                            type="text"
                            className='text-light-color questionType'
                            value="Short answer text"
                            disabled
                        />
                    </div>
                )
            }
            case "paragraph": {
                return (
                    <div className="col-md-7 mb-5">
                        <input
                            type="text"
                            className='text-light-color questionType'
                            value="Long answer text"
                            disabled
                        />
                    </div>
                )
            }
            case "multiple-choice": {
                return (
                    <MultipleChoice
                        questionData={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case "checkboxes": {
                return (
                    <CheckBox
                        questionData={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case "dropdown": {
                return (
                    <DropDown
                        questionData={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case "linear": {
                return (
                    <LinearScale
                        questionData={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case "multiple-choice-grid": {
                return (
                    <MultiChoiceGrid
                        questionData={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case "checkbox-grid": {
                return (
                    <CheckBoxGrid
                        questionData={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case "date": {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Month, day, year" disabled={true} />
                        </DemoContainer>
                    </LocalizationProvider>
                )
            }
            case "time": {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['TimePicker']}>
                            <TimePicker label="Time" disabled={true} />
                        </DemoContainer>
                    </LocalizationProvider>
                )
            }
        }
    }

    return (
        <div className="main-form-heading">
            <div className={`main-form-wrap ${!questionData?.active && "left-border-0"}`} style={{ position: "relative" }} onClick={() => updateActiveContentFunc()}>
                <>
                    {questionData?.active ?
                        <>
                            <div className="row">
                                <div className="col-md-7">
                                    <input type="text" name="name" className='text-light-color dark-text' autoFocus={true} autoComplete='off' value={questionData.question} onChange={(e) => updateQuestionFunc(e.target.value)} />
                                </div>
                                <div className="col-md-1 align-self-center">
                                    <div className='upload-main-img' onClick={() => inputRef?.current.click()}>
                                        <InsertPhotoOutlinedIcon className="lightColor" />
                                    </div>
                                    <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={handleChange} />
                                </div>
                                <div className="col-md-4">
                                    <div>
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
                                        <div className="question-main-wrap">
                                            <img src={questionData?.questionImgSrc} className='mw-100' />
                                            <div className="question-setting" id='basic-button' onClick={() => removeQuestionImg()}>
                                                <CloseRounded />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className='mb-4'>
                                {
                                    renderAnswerType()
                                }
                            </div>

                            <hr />

                            <div className="questionSettings">
                                <div className="d-flex justify-content-end align-items-center" style={{ gap: "0px 25px" }}>
                                    <div className="text-center" style={{ cursor: "pointer" }} onClick={(e) => deleteQuestionFunc(e)}>
                                        <DeleteOutlinedIcon className="lightColor" />
                                    </div>
                                    <div className="question-line"></div>
                                    <div className="">
                                        <span>Required</span>
                                        <Switch />
                                    </div>
                                </div>
                            </div>
                        </> :

                        <QuestionPreview questionData={questionData} preview={false} />
                    }
                </>
                {
                    (!formData?.formHeadingActive && questionData?.active) && <FloatBar sectionIndex={sectionIndex} questionIndex={questionIndex} clickedFrom={"question"} />
                }
            </div>
        </div>
    )
}

export default Question;
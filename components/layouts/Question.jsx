
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
import useSection from '../../app/store/section';
import QuestionPreview from './QuestionPreview';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { QUESTION_TYPE } from '../../app/utils/questionType.enum';

const Question = ({ questionData, questionIndex, sectionIndex }) => {
    console.log(questionData,"Question")

    const inputRef = useRef();

    const activeContent = useSection((state) => state.activeContent);
    const updateActiveSlide = useSection((state) => state.updateActiveSlide);

    const updateQuestion = useSection((state) => state.updateQuestion);
    const deleteQuestion = useSection((state) => state.deleteQuestion);

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
        // updateActiveContent(sectionIndex, questionIndex, "question")
    }

    const deleteQuestionFunc = (e) => {
        e.stopPropagation();
        deleteQuestion(sectionIndex, questionIndex);
    }
    const removeQuestionImg = () => {
        updateQuestion("questionImgSrc", null, sectionIndex, questionIndex)
    }
    
    const renderAnswerType = () => {
        switch (questionData?.question_type_id) {
            case QUESTION_TYPE.SHORT_ANSWER: {
                return (
                    <div className="col-md-6">
                        <input
                            type="text"
                            className='text-light-color questionType'
                            value="Short answer text"
                            disabled
                        />
                    </div>
                )
            }
            case QUESTION_TYPE.PARAGRAPH: {
                return (
                    <div className="col-md-7">
                        <input
                            type="text"
                            className='text-light-color questionType'
                            value="Long answer text"
                            disabled
                        />
                    </div>
                )
            }
            case QUESTION_TYPE.MULTIPLE_CHOICE: {
                return (
                    <MultipleChoice
                        question={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case QUESTION_TYPE.CHECKBOX: {
                return (
                    <CheckBox
                        question={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case QUESTION_TYPE.DROPDOWN: {
                return (
                    <DropDown
                        question={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case QUESTION_TYPE.LINEAR_SCALE: {
                return (
                    <LinearScale
                        question={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case QUESTION_TYPE.MULTIPLE_CHOICE_GRID: {
                return (
                    <MultiChoiceGrid
                        question={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case QUESTION_TYPE.CHECKBOX_GRID: {
                return (
                    <CheckBoxGrid
                        question={questionData}
                        sectionIndex={sectionIndex}
                        questionIndex={questionIndex}
                    />
                )
            }
            case QUESTION_TYPE.DATE: {
                return (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Month, day, year" disabled={true} />
                        </DemoContainer>
                    </LocalizationProvider>
                )
            }
            case QUESTION_TYPE.TIME: {
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

    const activeQuestion = activeContent?.sectionIndex === sectionIndex && activeContent?.questionIndex === questionIndex

    return (
        <div className="main-form-heading">
            <div className={`main-form-wrap ${!activeQuestion && "left-border-0"}`} style={{ position: "relative" }} onClick={() => updateActiveSlide(sectionIndex, questionIndex)}>
                <>
                    {activeQuestion ?
                        <>
                            <div className="row">
                                <div className="col-md-7 mb-3">
                                    <input type="text" name="name" className='text-light-color dark-text' autoFocus={true} autoComplete='off' value={questionData.question} onChange={(e) => updateQuestionFunc(e.target.value)} />
                                </div>
                                <div className="col-md-1 align-self-center">
                                    <div className='upload-main-img' onClick={() => inputRef?.current.click()}>
                                        <InsertPhotoOutlinedIcon className="lightColor" />
                                    </div>
                                    <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={handleChange} />
                                </div>
                                <div className="col-md-4">
                                    <div className='question-dropdown'>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="icon-select-label"
                                                defaultValue="short"
                                                label="Icon Select"
                                                value={questionData.question_type_id}
                                                onChange={(e) => updateQuestionType(e.target.value)}
                                            >
                                                <MenuItem value={QUESTION_TYPE.SHORT_ANSWER}>
                                                    <ShortTextIcon />
                                                    <span className="ms-3">Short answer</span>
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPE.PARAGRAPH}>
                                                    <ReorderSharpIcon />
                                                    <span className="ms-3">Paragraph</span>
                                                </MenuItem>
                                                <hr />
                                                <MenuItem value={QUESTION_TYPE.MULTIPLE_CHOICE}>
                                                    <AdjustSharpIcon />
                                                    <span className="ms-3">Multiple choice</span>
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPE.CHECKBOX}>
                                                    <CheckBoxOutlinedIcon />
                                                    <span className="ms-3">Checkboxes</span>
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPE.DROPDOWN}>
                                                    <ArrowDropDownCircleOutlinedIcon />
                                                    <span className="ms-3">Dropdown</span>
                                                </MenuItem>
                                                <hr />
                                                <MenuItem value={QUESTION_TYPE.LINEAR_SCALE}>
                                                    <LinearScaleOutlinedIcon />
                                                    <span className="ms-3">Linear scale</span>
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPE.MULTIPLE_CHOICE_GRID}>
                                                    <DragIndicatorOutlinedIcon />
                                                    <span className="ms-3">Multiple choice grid</span>
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPE.CHECKBOX_GRID}>
                                                    <AppsOutlinedIcon />
                                                    <span className="ms-3">Checkbox grid</span>
                                                </MenuItem>
                                                <hr />
                                                <MenuItem value={QUESTION_TYPE.DATE}>
                                                    <InsertInvitationOutlinedIcon />
                                                    <span className="ms-3">Date</span>
                                                </MenuItem>
                                                <MenuItem value={QUESTION_TYPE.TIME}>
                                                    <AccessTimeOutlinedIcon />
                                                    <span className="ms-3">Time</span>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            {
                                questionData?.question_img_src &&
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="question-main-wrap">
                                            <img src={questionData?.question_img_src} className='mw-100' />
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
                    activeQuestion && <FloatBar sectionIndex={sectionIndex} questionIndex={questionIndex} clickedFrom={"question"} />
                }
            </div>
        </div>
    )
}

export default Question;
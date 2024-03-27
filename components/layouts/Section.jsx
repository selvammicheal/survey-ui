
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

const Section = ({ setCount, floatIndex, activeSection }) => {

    const [question, setQuestion] = useState("Untitled Question");
    const [answerType, setAnswerType] = useState("short");
    const [file, setFile] = useState();
    const inputRef = useRef();

    const addSection = useSection((state) => state.addSection);

    const updateQuestion = (value) => {
        setQuestion(value)
    }

    const renderAnswerType = () => {
        switch (answerType) {
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
                return <MultipleChoice />

            case "checkboxes":
                return <CheckBox />

            case "dropdown":
                return <DropDown />

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
                return <LinearScale />

            case "multiple-choice-grid":
                return <MultiChoiceGrid />

            case "checkbox-grid":
                return <CheckBoxGrid />
        }

    }
    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        addSection()
    },[])
    return (
        <div className="main-form-haeding">
            <div className="main-form-wrap">
                <>
                    {/* <div className="row">
                        <div className="col-md-7">
                            <input type="text" name="name" className='text-light-color dark-text' autoFocus={true} value={question} onChange={(e) => updateQuestion(e.target.value)} />
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
                                        onChange={(e) => setAnswerType(e.target.value)}
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
                                        <MenuItem value="file-upload">
                                            <CloudUploadOutlinedIcon />
                                            <span className="ms-3">File upload</span>
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
                        file &&
                        <div className="row">
                            <div className="col-md-12">
                                <div className="questionmain-wrap">
                                    <img src={file} className='questionImage' />
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
                        <div className="row">
                            <div className="col-md-3 text-center align-self-center" onClick={() => console.log("clicked.........")}>
                                <ContentCopyRoundedIcon className="ligthColor" />
                            </div>
                            <div className="col-md-3 align-self-center text-center borderRight">
                                <DeleteOutlinedIcon className="ligthColor" />
                            </div>
                            <div className="col-md-6">
                                <span>Required</span>
                                <Switch />
                            </div>
                        </div>
                    </div> */}

                    {/* short */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Question
                        </div>
                        <div className="question-field">
                            <input type='text' value={"Short answer text"} disabled={true} />
                        </div>
                    </div> */}


                    {/* paragraph */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Question
                        </div>
                        <div className="question-field">
                            <input type='text' value={"Long answer text"} disabled={true} />
                        </div>
                    </div> */}



                    {/* multiplechoice */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Question
                        </div>
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
                                            Option 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}



                    {/* checkbox */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Question
                        </div>
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
                                            Option 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                    {/* dropdown */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Question
                        </div>
                        <div className="question-field">
                            <div className="row mt-2">
                                <div className="col-md-10">
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className="mutiple_option">
                                        1
                                        </div>
                                        <div className="w-100 ms-2 multiple-choice">
                                            Option 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}



                    {/* dropdown */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Question
                        </div>
                        <div className="question-field">
                            <div className="row mt-2">
                                <div className="col-md-10">
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className="mutiple_option">
                                        1
                                        </div>
                                        <div className="w-100 ms-2 multiple-choice">
                                            Option 1
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* linear */}
                    <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
                            Question
                        </div>
                        <div className="row mt-2 d-flex justify-content-center">
                            <div className="col-md-1 d-flex flex-column align-items-center  text-center">
                                <div className="mb-2">
                                    1
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    2
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    3
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    4
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    5
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    6
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    7
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    8
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    9
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
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                                <div className="mb-2">
                                    10
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
                        </div>
                    </div>


                    {/* multiplechoice grid */}
                    {/* <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
                            Untitled Question
                        </div>
                        <div className="question-field">
                            <div className="row mt-4">
                                <div className="col-md-2">
                                    <div className='align-items-center'>
                                        <div className="mutiple_option visible-hide col-off-set">
                                            Row
                                        </div>
                                        <div className="mutiple_option ms-3 mt-3">
                                            Row 1
                                        </div>
                                        <div className="mutiple_option ms-3 mt-3">
                                            Row 2
                                        </div>
                                        <div className="mutiple_option ms-3 mt-3">
                                            Row 3
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10 align-items-center">
                                    <div className="row">
                                        <div className="col-md-4 d-flex flex-column align-items-center">
                                            <div className="mutiple_option">
                                                Column 1
                                            </div>
                                            <div className="mutiple_option mt-3 ">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                            <div className="mutiple_option mt-3 ">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                            <div className="mutiple_option mt-3 ">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex flex-column align-items-center">
                                            <div className="mutiple_option">
                                                Column 1
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex flex-column align-items-center">
                                            <div className="mutiple_option">
                                                Column 1
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                            <Radio
                                                checked={false}
                                                value="disabled"
                                                disabled
                                                name="radio-buttons"
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  */}




                    {/* checkbox grid */}
                    {/* <div className='short-questions'>
                        <div className="question-heading ms-2 mb-3">
                            Untitled Question
                        </div>
                        <div className="question-field">
                            <div className="row mt-4">
                                <div className="col-md-2">
                                    <div className='align-items-center'>
                                        <div className="mutiple_option visible-hide col-off-set">
                                            Row
                                        </div>
                                        <div className="mutiple_option ms-3 mt-3">
                                            Row 1
                                        </div>
                                        <div className="mutiple_option ms-3 mt-3">
                                            Row 2
                                        </div>
                                        <div className="mutiple_option ms-3 mt-3">
                                            Row 3
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10 align-items-center">
                                    <div className="row">
                                        <div className="col-md-4 d-flex flex-column align-items-center">
                                            <div className="mutiple_option">
                                                Column 1
                                            </div>
                                            <div className="mutiple_option mt-3 ">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                            <div className="mutiple_option mt-3 ">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                            <div className="mutiple_option mt-3 ">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex flex-column align-items-center">
                                            <div className="mutiple_option">
                                                Column 1
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className="col-md-4 d-flex flex-column align-items-center">
                                            <div className="mutiple_option">
                                                Column 1
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                            <div className="mutiple_option mt-3 align-items-center">
                                                <FormGroup>
                                                    <FormControlLabel disabled control={<Checkbox />} />
                                                </FormGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* date */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Untitled Question
                        </div>
                        <div className="question-field">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Month, day, year" disabled={true} />
                        </DemoContainer>
                    </LocalizationProvider>
                        </div>
                    </div> */}


                    {/* time */}
                    {/* <div className='short-question'>
                        <div className="question-heading ms-2 mb-3">
                            Untitled Question
                        </div>
                        <div className="question-field">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker label="Time" disabled={true} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div> */}


                </>
            </div>

            {
                (floatIndex + 1) === activeSection && <FloatBar setCount={setCount} />
            }

        </div>
    )
}

export default Section;
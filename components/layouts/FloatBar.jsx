import useSection from "@/app/store/section"
import AddCircleOutlineTwoTone from "@mui/icons-material/AddCircleOutlineTwoTone"
import Image from "@mui/icons-material/Image"
import SplitscreenTwoTone from "@mui/icons-material/SplitscreenTwoTone"
import TextFieldsTwoTone from "@mui/icons-material/TextFieldsTwoTone"
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { useEffect, useRef } from "react"

const FloatBar = (props) => {

    const inputRef = useRef();
    const floatBarRef = useRef();
    const inputRefVideo = useRef();
    

    const addNewQuestion = useSection((state) => state.addNewQuestion);
    const addNewSection = useSection((state) => state.addNewSection);

    const addNewSectionFunc = (e) => {
        e.stopPropagation();
        addNewSection(props.sectionIndex, props.questionIndex, props.clickedFrom)
    }

    const addNewQuestionFunc = (e, type) => {
        e.stopPropagation();
        addNewQuestion(type, props.sectionIndex, props.questionIndex, null);
    }

    const addNewImageQuestion = (e) => {
        e.stopPropagation();
        inputRef?.current.click()
    }

    const addNewVideoQuestion = (e) => {
        e.stopPropagation();
        inputRefVideo?.current.click()
    }

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        // setVideoSrc(URL.createObjectURL(file));
        addNewQuestion("video", props.sectionIndex, props.questionIndex, URL.createObjectURL(e.target.files[0]));
    }

    const handleChange = (e) => {
        var fileName = e.target.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            addNewQuestion("image", props.sectionIndex, props.questionIndex, URL.createObjectURL(e.target.files[0]));
        }else{
            alert("Only jpg/jpeg and png files are allowed!");
        }   
    }

    useEffect(() => {
        floatBarRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "start"
          })
    },[props.sectionIndex])

    return (
        <div className="sideAddMenu" ref={floatBarRef}>
            <div onClick={(e) => addNewQuestionFunc(e, "question")}><AddCircleOutlineTwoTone /></div>
            <div onClick={(e) => addNewQuestionFunc(e, "title")}><TextFieldsTwoTone /></div>
            <div onClick={(e) => addNewImageQuestion(e)}><Image /></div>
            <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={handleChange} />
            <div onClick={(e) => addNewVideoQuestion(e)}><SmartDisplayOutlinedIcon /></div>
            <input type="file" accept="video/*" className='hidden-file' ref={inputRefVideo} onChange={handleVideoChange} />
            <div onClick={(e) => addNewSectionFunc(e)}><SplitscreenTwoTone /></div>
           
        </div>
    )
}

export default FloatBar
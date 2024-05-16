import useSection from "../../app/store/section"
import AddCircleOutlineTwoTone from "@mui/icons-material/AddCircleOutlineTwoTone"
import Image from "@mui/icons-material/Image"
import SplitscreenTwoTone from "@mui/icons-material/SplitscreenTwoTone"
import TextFieldsTwoTone from "@mui/icons-material/TextFieldsTwoTone"
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { useEffect, useRef } from "react"
import { createQuestion, createSection } from "../../services/api"

const FloatBar = (props) => {

    const inputRef = useRef();
    const floatBarRef = useRef();
    const inputRefVideo = useRef();
    
    const updateActiveSlide = useSection((state) => state.updateActiveSlide);

    const addNewQuestion = useSection((state) => state.addNewQuestion);
    const addNewSection = useSection((state) => state.addNewSection);

    const addNewSectionFunc = async (e) => {
        e.stopPropagation();
        const payload = {
            survey_id: props.formInfo._id,
            name: null,
            description: null
        }
        const section = await createSection(payload);

        let data = JSON.parse(JSON.stringify(props.formInfo));
        data.sections.push(section)
        props.setFormInfo(data);

        // addNewSection(props.sectionIndex, props.questionIndex, props.clickedFrom)
    }

    const addNewQuestionFunc = async(e, type) => {
        e.stopPropagation();

        const payload = {
            question: null,
            question_type_id: props?.questionTypes[0]._id,
            question_img_src: "",
            option: null,
            section_id: props.formInfo.sections[props.sectionIndex]._id,
            survey_id: props.formInfo._id,
            mandatory: false
        }
        const question = await createQuestion(payload);
 
        let data = JSON.parse(JSON.stringify(props.formInfo));
        data.sections[props.sectionIndex].questions.push(question)
        props.setFormInfo(data);

        updateActiveSlide(props.sectionIndex, props.formInfo.sections[props.sectionIndex].questions.length)

        // addNewQuestion(type, props.sectionIndex, props.questionIndex, null);
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
            <div onClick={(e) => addNewQuestionFunc(e)}><AddCircleOutlineTwoTone /></div>
            <div onClick={(e) => addNewQuestionFunc(e)}><TextFieldsTwoTone /></div>
            <div onClick={(e) => addNewImageQuestion(e)}><Image /></div>
            <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={handleChange} />
            <div onClick={(e) => addNewVideoQuestion(e)}><SmartDisplayOutlinedIcon /></div>
            <input type="file" accept="video/*" className='hidden-file' ref={inputRefVideo} onChange={handleVideoChange} />
            <div onClick={(e) => addNewSectionFunc(e)}><SplitscreenTwoTone /></div>
           
        </div>
    )
}

export default FloatBar
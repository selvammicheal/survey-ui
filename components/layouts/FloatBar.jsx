import useSection from "../../app/store/section"
import AddCircleOutlineTwoTone from "@mui/icons-material/AddCircleOutlineTwoTone"
import Image from "@mui/icons-material/Image"
import SplitscreenTwoTone from "@mui/icons-material/SplitscreenTwoTone"
import TextFieldsTwoTone from "@mui/icons-material/TextFieldsTwoTone"
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import { useEffect, useRef } from "react"
import { createQuestion, createSection } from "../../services/api"
import { QUESTION_TYPE } from "../../app/utils/questionType.enum"

const FloatBar = ({formInfo, setFormInfo, sectionIndex}) => {

    const inputRef = useRef();
    const floatBarRef = useRef();
    const inputRefVideo = useRef();
    
    const updateActiveSlide = useSection((state) => state.updateActiveSlide);

    const addNewSectionFunc = async (e) => {
        e.stopPropagation();
        const payload = {
            survey_id: formInfo._id,
            name: "Untitled Section",
            description: null,
            isActive: true
        }
        const section = await createSection(payload);
        section["questions"] = []

        let data = JSON.parse(JSON.stringify(formInfo));
        data.sections.push(section)
        setFormInfo(data);

        updateActiveSlide(formInfo.sections.length, null)
    }

    const addNewQuestionFunc = async({questionTypeId, event = null, src = null}) => {
        if(event){
            event.stopPropagation();
        }
        
        const payload = {
            question_type_id: questionTypeId,
            question_img_src: "",
            option: null,
            section_id: formInfo.sections[sectionIndex]._id,
            survey_id: formInfo._id,
            mandatory: false
        }
        const question = await createQuestion(payload);
 
        if(src){
            question.question_data = src;
        }

        let data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions.push(question)
        setFormInfo(data);

        updateActiveSlide(sectionIndex, formInfo.sections[sectionIndex]["questions"].length ?? 0)

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
        addNewQuestionFunc({questionTypeId: QUESTION_TYPE.VIDEO, src: URL.createObjectURL(e.target.files[0]) })
    }

    const handleChange = (e) => {
        var fileName = e.target.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            addNewQuestionFunc({questionTypeId: QUESTION_TYPE.IMAGE, src: URL.createObjectURL(e.target.files[0]) })
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
    },[sectionIndex])

    return (
        <div className="sideAddMenu" ref={floatBarRef}>
            <div onClick={(e) => addNewQuestionFunc({questionTypeId: QUESTION_TYPE.SHORT_ANSWER, event: e})}><AddCircleOutlineTwoTone /></div>
            <div onClick={(e) => addNewQuestionFunc({questionTypeId: QUESTION_TYPE.TITLE, event: e})}><TextFieldsTwoTone /></div>
            <div onClick={(e) => addNewImageQuestion(e)}><Image /></div>
            <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={handleChange} />
            <div onClick={(e) => addNewVideoQuestion(e)}><SmartDisplayOutlinedIcon /></div>
            <input type="file" accept="video/*" className='hidden-file' ref={inputRefVideo} onChange={handleVideoChange} />
            <div onClick={(e) => addNewSectionFunc(e)}><SplitscreenTwoTone /></div>
           
        </div>
    )
}

export default FloatBar
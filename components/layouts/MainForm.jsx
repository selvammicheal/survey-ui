import { useRef, useState } from "react";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import TextFieldsTwoToneIcon from '@mui/icons-material/TextFieldsTwoTone';
import ImageIcon from '@mui/icons-material/Image';
import SplitscreenTwoToneIcon from '@mui/icons-material/SplitscreenTwoTone';
import FloatBar from "./FloatBar";
import useSection from "@/app/store/section";
import Question from "./Question";

const MainForm = () => {

    const formData = useSection((state) => state.formData);
    const updateFormData = useSection((state) => state.updateFormData);
    const updateActiveContent = useSection((state) => state.updateActiveContent);
    const updateFormValue = useSection((state) => state.updateFormValue);
    

    const updateFormTitle = (value) => {
        updateFormData(value, "formName")
    }
    const updateDescriptionTitle = (value) => {
        updateFormData(value, "formDescription")
    }

    const updateActiveContentFunc = () => {
        updateFormData(true, "formHeadingActive");
        updateActiveContent(false, null, null);
    }

    console.log(formData,"formData.sections")

    const dragItem = useRef(0)
    const dragOverItem = useRef(0)
 
    const handleSort = (sectionIndex) => {
        const data  = JSON.parse(JSON.stringify(formData));
        const copyArr = [...data.sections[sectionIndex].questions];
        const temp = copyArr[dragItem.current]
        copyArr[dragItem.current] = copyArr[dragOverItem.current]
        copyArr[dragOverItem.current] = temp
        data.sections[sectionIndex].questions = [...copyArr];
        updateFormValue(data)
    }

    return (
        <div>
            <div className="main-form-haeding" onClick={() => updateActiveContentFunc()}>
                <div className="top-border-form"></div>
                <div className={`main-form-wrap ${!formData?.formHeadingActive && "left-border-0"}`}>
                    <input type="text" name="name" className='text-heading' value={formData.formName} onChange={(e) => updateFormTitle(e.target.value)} />
                    <input type="text" name="name" className='text-light-color' value={formData.formDescription} onChange={(e) => updateDescriptionTitle(e.target.value)} />
                </div>
                {
                    formData?.formHeadingActive && <FloatBar sectionIndex={0} questionIndex={null} />
                }
            </div>
            {
                formData.sections.map((section, sectionIndex) => (
                    <div>
                        {
                            section.questions.map((question, questionIndex) => (
                                <div 
                                    draggable="true"
                                    onDragStart={() => dragItem.current = questionIndex}
                                    onDragEnter={() => dragOverItem.current = questionIndex}
                                    onDragEnd={() => handleSort(sectionIndex)}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    <Question questionData={question} sectionIndex={sectionIndex} questionIndex={questionIndex} />
                                </div>
                            ))
                        }
                    </div>
                ))
            }

        </div>

    )
}

export default MainForm;
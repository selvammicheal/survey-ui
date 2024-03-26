import { useState } from "react";
import Section from "./Section";
import AddNewQuestions from "../answerType/AddnewQuestions";
import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import TextFieldsTwoToneIcon from '@mui/icons-material/TextFieldsTwoTone';
import ImageIcon from '@mui/icons-material/Image';
import SplitscreenTwoToneIcon from '@mui/icons-material/SplitscreenTwoTone';
import FloatBar from "./FloatBar";
const MainForm = () => {

    const [formTitle, setFormTitle] = useState("Untitled form");
    const [descriptionTitle, setDescription] = useState("Form description");
    const[sectionCount,setSectionCount] = useState(1);
    const [activeSection, setActiveSection] = useState(1);

    const updateFormTitle = (value) => {
        setFormTitle(value)
    }
    const updateDescriptionTitile = (value) => {
        setDescription(value)
    }

    // const updateQuestionType=(value) => {
    //     setQuestionType(value)
    // }

    return (
        <div>
            <div className="main-form-haeding" onClick={() => setActiveSection(0)}>
                <div className="top-border-form"></div>
                <div className="main-form-wrap">

                    <input type="text" name="name" className='text-heading' value={formTitle} onChange={(e) => updateFormTitle(e.target.value)} />
                    <input type="text" name="name" className='text-light-color' value={descriptionTitle} onChange={(e) => updateDescriptionTitile(e.target.value)} />
                </div>
                {
                    activeSection === 0 && <FloatBar setCount = {setSectionCount}  />
                }
            </div>
            {
                [...Array(sectionCount).keys()].map((x, index) => (
                    <div onClick={() => setActiveSection(index + 1)}>
                    <Section setCount = {setSectionCount} floatIndex={index} activeSection = {activeSection}/>
                    </div>
                ))
            }


        </div>

    )
}

export default MainForm;
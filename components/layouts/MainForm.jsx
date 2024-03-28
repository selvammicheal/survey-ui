import { useState } from "react";
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
                                <div>
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
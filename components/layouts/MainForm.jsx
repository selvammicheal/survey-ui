import { useRef } from "react";
import FloatBar from "./FloatBar";
import useSection from "@/app/store/section";
import Question from "./Question";
import OtherTypeQuestion from "./OtherTypeQuestion";
import { DeleteOutlined } from "@mui/icons-material";
import SectionHeader from "./SectionHeader";

const MainForm = () => {

    const dragItem = useRef(0);
    const dragOverItem = useRef(0);

    const otherTypeQuestions = ["title", "image", "video"];

    const formData = useSection((state) => state.formData);
    const updateFormData = useSection((state) => state.updateFormData);
    const updateActiveContent = useSection((state) => state.updateActiveContent);
    const updateFormValue = useSection((state) => state.updateFormValue);
    const updateSectionData = useSection((state) => state.updateSectionData);


    const updateFormTitle = (value) => {
        updateFormData(value, "formName")
    }
    
    const updateDescriptionTitle = (value) => {
        updateFormData(value, "formDescription")
    }

    const updateActiveContentFunc = (type, sectionIndex) => {
        updateActiveContent(sectionIndex, null, type);
    }

    const handleSort = (sectionIndex) => {
        const data = JSON.parse(JSON.stringify(formData));
        const copyArr = [...data.sections[sectionIndex].questions];
        const temp = copyArr[dragItem.current]
        copyArr[dragItem.current] = copyArr[dragOverItem.current]
        copyArr[dragOverItem.current] = temp
        data.sections[sectionIndex].questions = [...copyArr];
        updateFormValue(data)
    }

    return (
        <div style={{width: "70%", margin: "0px auto"}}>
            <div className="main-form-heading" onClick={() => updateActiveContentFunc("formHeader", null)}>
                <div className={`top-border-form ${formData?.sections.length > 1 ? "active" : ""}`} data-custom={`Section 1 of ${formData?.sections.length}`}></div>
                <div className={`main-form-wrap top-border-0 ${!formData?.formHeadingActive && "left-border-0"}`}>
                    <input type="text" name="name" className='text-heading' value={formData.formName} onChange={(e) => updateFormTitle(e.target.value)} />
                    <input type="text" name="name" className='text-light-color' value={formData.formDescription} onChange={(e) => updateDescriptionTitle(e.target.value)} />
                </div>
                {
                    formData?.formHeadingActive && <FloatBar sectionIndex={0} questionIndex={null} clickedFrom={"formHeader"}/>
                }
            </div>
            {
                formData.sections.map((section, sectionIndex) => {
                return(
                    <div key={sectionIndex}>
                        {
                            sectionIndex != 0 && <SectionHeader section={section} sectionIndex={sectionIndex}/>
                        }
                        
                        {
                            section.questions.map((question, questionIndex) => (
                                <div
                                    key={questionIndex}
                                    draggable="true"
                                    onDragStart={() => dragItem.current = questionIndex}
                                    onDragEnter={() => dragOverItem.current = questionIndex}
                                    onDragEnd={() => handleSort(sectionIndex)}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {
                                        otherTypeQuestions.includes(question.questionType) ? (
                                            <OtherTypeQuestion questionData={question} sectionIndex={sectionIndex} questionIndex={questionIndex}/>
                                        ) : (
                                            <Question questionData={question} sectionIndex={sectionIndex} questionIndex={questionIndex} />
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                )})
            }

        </div>

    )
}

export default MainForm;
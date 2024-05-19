"use client"
import { useEffect, useRef, useState } from "react";
import { getAllQuestionType, getFormData, updateFormData } from "../../services/api";
import FloatBar from "../../components/layouts/FloatBar";
import Question from "../../components/layouts/Question";
import OtherTypeQuestion from "../../components/layouts/OtherTypeQuestion";
import SectionHeader from "../../components/layouts/SectionHeader";
import useSection from "../../app/store/section";
import { QUESTION_TYPE } from "../../app/utils/questionType.enum";

const MainForm = ({surveyId, formInfo, setFormInfo}) => {

    const [questionTypes, setQuestionTypes] = useState([]);

    const dragItem = useRef(0);
    const dragOverItem = useRef(0);

    const otherTypeQuestions = [QUESTION_TYPE.TITLE, QUESTION_TYPE.IMAGE, QUESTION_TYPE.VIDEO];

    const activeContent = useSection((state) => state.activeContent);
    const updateActiveSlide = useSection((state) => state.updateActiveSlide);

    const updateFormTitle = (value) => {
        if(value === "") value = null
        //update local state
        const data = { ...formInfo };
        data.name = value;
        setFormInfo(data)

        // api-call
        const payload = {
            name: value
        }
        updateFormData(payload, formInfo._id);
    }

    const updateFormDescription = (value) => {
         //update local state
         const data = { ...formInfo };
         data.description = value;
         setFormInfo(data)
 
         // api-call
        const payload = {
            description: value
        }
        updateFormData(payload, formInfo._id)
    }

    const handleSort = (sectionIndex) => {
        const data = JSON.parse(JSON.stringify(formInfo));
        const copyArr = [...data.sections[sectionIndex].questions];
        const temp = copyArr[dragItem.current]
        copyArr[dragItem.current] = copyArr[dragOverItem.current]
        copyArr[dragOverItem.current] = temp
        data.sections[sectionIndex].questions = [...copyArr];
        // updateFormValue(data)
        setFormInfo(data)
    }

    useEffect(() => {
        async function fetchData() {
            const formDataResponse = await getFormData(surveyId);
            setFormInfo(formDataResponse);

            const questionTypeResponse = await getAllQuestionType();
            setQuestionTypes(questionTypeResponse);
        }
        fetchData();
    }, [])

    const formHeadingActive = activeContent.sectionIndex === null && activeContent.questionIndex === null

    return (
        <div style={{ width: "70%", margin: "0px auto" }}>
            <div className="main-form-heading" onClick={() => updateActiveSlide(null, null)}>
                <div className={`top-border-form ${formInfo?.sections?.length > 1 ? "active" : ""}`} data-custom={`Section 1 of ${formInfo?.sections?.length}`}></div>
                <div className={`main-form-wrap top-border-0 ${!formHeadingActive && "left-border-0"}`}>
                    <input 
                        type="text" 
                        name="form-name" 
                        placeholder="Untitled form"
                        className='text-heading' 
                        onFocus={(e) => e.target.select()}
                        value={formInfo?.name ? formInfo?.name : ""} 
                        onChange={(e) => updateFormTitle(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        name="form-description" 
                        className='text-light-color' 
                        placeholder="Form description"
                        value={formInfo?.description ? formInfo?.description : ""} 
                        onChange={(e) => updateFormDescription(e.target.value)} 
                    />
                </div>
                {
                    formHeadingActive && <FloatBar sectionIndex={0} formInfo={formInfo} setFormInfo={setFormInfo} />
                }
            </div>
            {
                formInfo?.sections?.map((section, sectionIndex) => {
                    return (
                        <div key={sectionIndex}>
                            {
                                sectionIndex != 0 && <SectionHeader section={section} sectionIndex={sectionIndex} formInfo={formInfo} setFormInfo={setFormInfo} questionTypes={questionTypes} />
                            }

                            {
                                section?.questions?.map((question, questionIndex) => (
                                    <div
                                        key={questionIndex}
                                        draggable="true"
                                        onDragStart={() => dragItem.current = questionIndex}
                                        onDragEnter={() => dragOverItem.current = questionIndex}
                                        onDragEnd={() => handleSort(sectionIndex)}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        {
                                            otherTypeQuestions.includes(question?.question_type_id) ? (
                                                <OtherTypeQuestion 
                                                    questionData={question} 
                                                    sectionIndex={sectionIndex} 
                                                    questionIndex={questionIndex} 
                                                    formInfo={formInfo}
                                                    setFormInfo={setFormInfo}
                                                />
                                            ) : (
                                                <Question
                                                    questionData={question}
                                                    sectionIndex={sectionIndex}
                                                    questionIndex={questionIndex}
                                                    formInfo={formInfo}
                                                    setFormInfo={setFormInfo}
                                                />
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                })
            }

        </div>

    )
}

export default MainForm;
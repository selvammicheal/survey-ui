import React, { useEffect, useState } from 'react'
import QuestionPreview from './QuestionPreview';
import Button from '@mui/material/Button';
import { submitSurvey } from '../../services/api';
import { QUESTION_TYPE } from '../../app/utils/questionType.enum';

const Preview = ({ formInfo, setFormInfo }) => {

    const [sectionIndex, setSectionIndex] = useState(0);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [mandatoryQuesId, setMandatoryQuesId] = useState([]);
    const [missingIds, setMissingIds] = useState([]);

    const [validate, setValidate] = useState(false);

    const [surveyResponse, setSurveyResponse] = useState([]);

    const submitResponse = async () => {
        await submitSurvey(surveyResponse).then(() => setFormSubmitted(true));
        setSurveyResponse([]);
    }

    useEffect(() => {
        const data = formInfo?.sections[sectionIndex]?.questions?.filter((question) => question.mandatory === true).map((x) => ({
            questionId: x._id,
            questionTypeId: x.question_type_id
        }));
        setMandatoryQuesId(data)
    }, [sectionIndex])

    useEffect(() => {
        if (validate) {
            const missingIdsData = mandatoryQuesId.filter(data => {
                const answered = surveyResponse.some(formResponse => formResponse.question_id === data.questionId)
                if (data.questionTypeId === QUESTION_TYPE.CHECKBOX_GRID && answered) {
                    return !surveyResponse.find((x) => x.question_id === data.questionId).question_response.every((x) => x.checked?.length > 0)
                    // return true
                } else if (data.questionTypeId === QUESTION_TYPE.MULTIPLE_CHOICE_GRID && answered) {
                    return !surveyResponse.find((x) => x.question_id === data.questionId).question_response.every((x) => x.checked !== null) 
                } else {
                    return !answered
                }
            });

            setMissingIds(missingIdsData.map((x) => x.questionId))
        }
    }, [surveyResponse, validate])

    const validateFields = () => {

        setValidate(true)

        const missingIdsData = mandatoryQuesId.filter(data => {
            const answered = surveyResponse.some(formResponse => formResponse.question_id === data.questionId)
            if (data.questionTypeId === QUESTION_TYPE.CHECKBOX_GRID && answered) {
                return !surveyResponse.find((x) => x.question_id === data.questionId).question_response.every((x) => x.checked?.length > 0)
                // return true
            } else if (data.questionTypeId === QUESTION_TYPE.MULTIPLE_CHOICE_GRID && answered) {
                return !surveyResponse.find((x) => x.question_id === data.questionId).question_response.every((x) => x.checked !== null) 
            } else {
                return !answered
            }
        });

        setMissingIds(missingIdsData.map((x) => x.questionId))

        if (missingIdsData.length === 0) {
            setSectionIndex(sectionIndex + 1)
        }
    }

    return (
        <div style={{ width: "70%", margin: "0px auto" }}>
            {
                formSubmitted ?
                    <div className="main-form-heading">
                        <div className={`top-border-form`}></div>
                        <div className={`main-form-wrap top-border-0 left-border-0`}>
                            <div className='text-heading'>{formInfo?.name}</div>
                            <div className='my-4'>Your response has been recorded.</div>
                            <div style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={() => { setFormSubmitted(false); setSectionIndex(0) }}>Submit another response</div>
                        </div>

                    </div>
                    :
                    <div className="main-form-heading">
                        <div className={`top-border-form`}></div>
                        <div className={`main-form-wrap top-border-0 left-border-0`} style={{ marginBottom: "4rem" }}>
                            <div className='text-heading'>{formInfo?.name}</div>
                            <div className='text-light-color mt-3'>{formInfo?.description}</div>
                        </div>

                        <div>
                            {
                                formInfo?.sections.map((section, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                sectionIndex == index ?

                                                    section.questions.map((question, questionIndex) => (
                                                        <div key={questionIndex} className={`main-form-heading ${(index > 0 && questionIndex == 0) && "preview-active"}`} data-custom={section?.name}>
                                                            <div className={`main-form-wrap ${missingIds?.includes(question?._id) ? "error-border" : "left-border-0"}`}>
                                                                <QuestionPreview missingIds={missingIds} questionData={question} preview={true} surveyResponse={surveyResponse} setSurveyResponse={setSurveyResponse} />
                                                            </div>
                                                        </div>
                                                    )) : <></>
                                            }
                                        </div>
                                    )
                                })
                            }
                            <div className="d-flex" style={{ gap: "0px 10px" }}>
                                {
                                    sectionIndex !== 0 &&
                                    <Button variant="outlined" onClick={() => setSectionIndex(sectionIndex - 1)}>Back</Button>
                                }
                                {
                                    formInfo?.sections?.length > sectionIndex + 1 &&
                                    <Button variant="outlined" onClick={() => validateFields()}>Next</Button>
                                }
                                {
                                    formInfo?.sections?.length == sectionIndex + 1 &&
                                    <Button variant="contained" onClick={() => submitResponse()}>submit</Button>
                                }

                            </div>
                        </div>
                    </div>
            }


        </div>
    )
}

export default Preview;

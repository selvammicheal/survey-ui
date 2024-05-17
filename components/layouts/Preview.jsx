import useSection from '../../app/store/section';
import React, { useState } from 'react'
import QuestionPreview from './QuestionPreview';
import Button from '@mui/material/Button';

const Preview = ({formInfo, setFormInfo}) => {

    const formData = useSection((state) => state.formData);

    console.log(formInfo,"formInfoformInfoformInfo")

    const [sectionIndex, setSectionIndex] = useState(0);
    const [formSubmitted, setFormSubmited] = useState(false);

    return (
        <div style={{ width: "70%", margin: "0px auto" }}>
            {
                formSubmitted ?
                    <div className="main-form-heading">
                        <div className={`top-border-form`}></div>
                        <div className={`main-form-wrap top-border-0 left-border-0`}>
                            <div className='text-heading'>{formInfo?.name}</div>
                            <div className='my-4'>Your response has been recorded.</div>
                            <div style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={() => { setFormSubmited(false); setSectionIndex(0) }}>Submit another response</div>
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
                                                            <div className={`main-form-wrap left-border-0`}>
                                                                <QuestionPreview questionData={question} preview={true} />
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
                                    <Button variant="outlined" onClick={() => setSectionIndex(sectionIndex + 1)}>Next</Button>
                                }
                                {
                                    formInfo?.sections?.length == sectionIndex + 1 &&
                                    <Button variant="contained" onClick={() => setFormSubmited(true)}>submit</Button>
                                }

                            </div>
                        </div>
                    </div>
            }


        </div>
    )
}

export default Preview;

import useSection from '@/app/store/section';
import React, { useState } from 'react'
import QuestionPreview from './QuestionPreview';

const Preview = () => {

    const formData = useSection((state) => state.formData);
    
    const [sectionIndex, setSectionIndex] = useState(0);

    return (
        <div style={{ width: "70%", margin: "0px auto" }}>
            <div className="main-form-heading">
                <div className={`top-border-form`}></div>
                <div className={`main-form-wrap top-border-0 left-border-0`}>
                    <div className='text-heading'>{formData.formName}</div>
                    <div className='text-light-color mt-3'>{formData.formDescription}</div>
                </div>

                <div>
                    {
                        formData?.sections.map((section, index) => {
                            return (
                                <div>
                                    {
                                        sectionIndex == index ?

                                        section.questions.map((question, questionIndex) => (
                                            <div className="main-form-heading">
                                                <div className={`main-form-wrap`}>
                                                    <QuestionPreview questionData={question} preview={true}/>
                                                </div>
                                            </div>
                                        )) : <></>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {/* {renderSection()} */}
            </div>

        </div>
    )
}

export default Preview;

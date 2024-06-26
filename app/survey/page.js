"use client"
import React, { useEffect, useState } from 'react';
import { createSurvey, getAllForms } from '../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function page() {

    const [forms, setForms] = useState([]);
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            const allFormsResponse = await getAllForms();
            setForms(allFormsResponse);
        }
        fetchData();
    }, [])

    const createNewSurvey = async () => {
        const survey = {
            description: null
        }

        const surveyRes = await createSurvey(survey);
        router.push(`survey/${surveyRes?._id}`)

    }

    return (
        <div className='form-screen ms-4'>
            <div className='d-flex align-items-center justify-content-between mb-4'>
                <div className="survey-list-label">List of survey's</div>
                <div className='create-survey-btn' onClick={() => createNewSurvey()}>Create Survey</div>
            </div>

            {
                forms?.length > 0 ?

                forms?.map((form, index) => (
                    <Link href={`survey/${form?._id}`} key={index}>
                        <div className='form-item'>
                            {form?.name ? form?.name : "Untitled form"}
                        </div>
                    </Link>
                )) :

                <div className='form-item' style={{border: "0px"}}>No Survey's found</div>
            }
        </div>
    )
}

export default page;
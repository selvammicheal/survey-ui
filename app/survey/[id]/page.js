"use client"
import React, { useEffect, useState } from 'react';
import { VisibilityOutlined } from '@mui/icons-material';
import Preview from '../../../components/layouts/Preview';
import MainForm from '../../../components/layouts/MainForm';
import useSection from '../../store/section';

const CreateForm = ({params}) => {
    const [formInfo, setFormInfo] = useState(null);

    const [isPreview, setIsPreview] = useState(false);

    return (
        <div>
            <div className='preview-icon'>
                <VisibilityOutlined className='mainPreviewIcon' onClick={() => setIsPreview((prev) => !prev)}/>
            </div>
            {
                isPreview ?
                    <Preview formInfo={formInfo} setFormInfo={setFormInfo}/>
                    :
                    <MainForm formInfo={formInfo} setFormInfo={setFormInfo} surveyId={params?.id}/>
            }
        </div>
    );
}

export default CreateForm;
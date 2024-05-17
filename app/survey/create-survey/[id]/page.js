"use client"
import React, { useState } from 'react';
import { VisibilityOutlined } from '@mui/icons-material';
import Preview from '../../../../components/layouts/Preview';
import MainForm from '../../../../components/layouts/MainForm';
import useSection from '../../../store/section';

const CreateForm = ({params}) => {
    const [formInfo, setFormInfo] = useState(null);
    
    const isPreview = useSection((state) => state.isPreview);
    const togglePreview = useSection((state) => state.togglePreview);

    console.log(formInfo,"formInfoformInfoformInfo2")

    return (
        <div>
            <div className='preview-icon' onClick={() => togglePreview(!isPreview)}>
                <VisibilityOutlined className='mainPreviewIcon' />
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
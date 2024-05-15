"use client"
import React, { useState } from 'react';
import { VisibilityOutlined } from '@mui/icons-material';
import Preview from '../../components/layouts/Preview';
import MainForm from '../../components/layouts/MainForm';



function page(props) {
    const [preview, setPreview] = useState(false)
    // console.log(preview)
    const previewChange = () => {
        //    const previewdata = preview
        setPreview(!preview)
    }
    return (
        <div>
            <div className='preview-icon' onClick={() => previewChange()}>
                <VisibilityOutlined className='mainPreviewIcon' />
            </div>
            {
                preview ?
                    <Preview />
                    :
                    <MainForm />
            }
        </div>
    );
}

export default page;
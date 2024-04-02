"use client"
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import BasicTabs from '@/components/layouts/Tab';
import { VisibilityOutlined } from '@mui/icons-material';
import Preview from '@/components/layouts/Preview';



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
                    <BasicTabs />
            }
        </div>
    );
}

export default page;
import useSection from '@/app/store/section';
import React from 'react'

const Preview = () => {

    const formData = useSection((state) => state.formData);
    console.log(formData)
    return (
        <div style={{width: "70%", margin: "0px auto"}}>
            <div className="main-form-heading" onClick={() => updateActiveContentFunc("formHeader", null)}>
                <div className={`top-border-form`}></div>
                <div className={`main-form-wrap top-border-0 left-border-0`}>
                    <div className='text-heading'>{formData.formName}</div>
                    <div className='text-light-color mt-3'>{formData.formDescription}</div>
                </div>
            </div>
            
        </div>
    )
}

export default Preview;

import useSection from "@/app/store/section";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useState } from "react";

const DropDown = ({questionData, sectionIndex, questionIndex}) => {

    const updateOptions = useSection((state) => state.updateOptions);

    const updateDropdown = (value, index) => {
        updateOptions("update", "name", value, sectionIndex, questionIndex, index)
    }

    const dropDownRemoveValue = (index) => {
        updateOptions("delete", null, null, sectionIndex, questionIndex, index)
    }

    const addDropdown = () => {
        updateOptions("add", null, null, sectionIndex, questionIndex, null)
    }

    return (
        <>
            {
                questionData?.questionData?.options?.map((item, index) => (
                    <div className="row mt-2" key={index}>
                        <div className='col-md-11'>
                            <div className='d-flex align-items-center mt-3'>
                                <div className="mutiple_option">{index + 1}.</div>
                                <div className='w-100'>
                                    <input type="text" name="name" className='text-light-color questionType' value={item.name} onChange={(e) => updateDropdown(e.target.value, index)} />
                                </div>
                            </div>
                        </div>
                        {
                            (index > 0 || questionData?.questionData?.options?.length > 1) &&
                            <div className="col-md-1 align-self-center close-btn" onClick={() => dropDownRemoveValue(index)}>
                                <CloseRounded />
                            </div>
                        }
                    </div>
                ))
            }
            <div className='d-flex align-items-end mt-3'>
                <div className="mutiple_option">{questionData?.questionData?.options.length + 1}.</div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => addDropdown()}>Add Option</div>
                </div>
            </div>
        </>
    )
}
export default DropDown;
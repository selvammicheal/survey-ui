import useSection from "@/app/store/section";
import { CloseRounded, InsertPhotoOutlined } from "@mui/icons-material";
import { Radio } from "@mui/material";
import { useRef, useState } from "react";

const MultipleChoice = ({questionData, sectionIndex, questionIndex}) => {

    const [imgIndex, setImgIndex] = useState();
    const inputRef = useRef();

    const updateOptions = useSection((state) => state.updateOptions);

    const updateMultipleChoice = (value, index) => {
        updateOptions("update", "name", value, sectionIndex, questionIndex, index)
    }

    const removeMultipleChoice = (index) => {
        updateOptions("delete", null, null, sectionIndex, questionIndex, index)
    }

    const addMultipleChoiceOption = () => {
        updateOptions("add", null, null, sectionIndex, questionIndex, null)
    }

    const handleMultipleChoiceImg = (event) => {
        updateOptions("update", "imgSrc", URL.createObjectURL(event.target.files[0]), sectionIndex, questionIndex, imgIndex);
    }

    const removeMultipleChoiceImg = (index) => {
        updateOptions("update", "imgSrc", null, sectionIndex, questionIndex, index);
    }

    return (
        <div>
            {
                questionData?.questionData?.options?.map((x, i) => (
                    <>
                        <div className="row mt-2">
                            <div className="col-md-10">
                                <div className='d-flex align-items-center mt-3'>
                                    <div className="multiple_option">
                                        <Radio
                                            checked={false}
                                            value="disabled"
                                            disabled
                                            name="radio-buttons"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <input type="text" name="name" className='text-light-color questionType' value={x.name} onChange={(e) => updateMultipleChoice(e.target.value, i)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 align-self-center">
                                <div className='upload-main-img' onClick={() => { inputRef?.current.click(); setImgIndex(i)}}>
                                    <InsertPhotoOutlined className="lightColor" />
                                </div>
                                <input type="file" className='hidden-file' ref={inputRef} onChange={(e) => handleMultipleChoiceImg(e)} />
                            </div>
                            {
                                (i > 0 || questionData?.questionData?.options.length > 1) &&
                                <div className="col-md-1 align-self-center close-btn" onClick={() => removeMultipleChoice(i)}>
                                    <CloseRounded />
                                </div>
                            }
                        </div>
                        {
                            x.imgSrc &&
                            <div className="multiple-img-close">
                                <div className="col-md-1 align-self-center close-btn" onClick={() => removeMultipleChoiceImg(i)}>
                                    <CloseRounded />
                                </div>
                                <img className="mt-3 ms-4" style={{ height: "100px", width: "100px" }} src={x.imgSrc} alt="" />
                            </div>
                        }

                    </>
                ))
            }
            <div className='d-flex align-items-end mt-3'>
                <div className="multiple_option">
                    <Radio
                        checked={false}
                        value="disabled"
                        disabled
                        name="radio-buttons"
                    />
                </div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => addMultipleChoiceOption()}>Add Option</div>
                </div>
            </div>
        </div>

    )
}

export default MultipleChoice
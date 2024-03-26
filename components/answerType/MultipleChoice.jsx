import { CloseRounded, InsertPhotoOutlined } from "@mui/icons-material";
import { Radio } from "@mui/material";
import { useRef, useState } from "react";

const MultipleChoice = () => {

    const initialMultiChoiceState = [
        {
            optionName: "Option 1",
            imgSrc: null
        }
    ]

    const [multiChoiceData, setMultiChoiceData] = useState(initialMultiChoiceState);
    const [imgIndex, setImgIndex] = useState();
    const inputRef = useRef();

    const updatingMultiChoice = {
        optionName: `Option ${multiChoiceData.length + 1}`,
        imgSrc: null
    }

    const updateMultipleChoice = (value, index) => {
        const data = multiChoiceData[index];
        data.optionName = value;
        setMultiChoiceData([...multiChoiceData])
    }

    const removeMultipleChoice = (index) => {
        const array = [...multiChoiceData]
        array.splice(index, 1);
        setMultiChoiceData([...array])
    }

    const handleMultipleChoiceImg = (event) => {
        const data = multiChoiceData[imgIndex];
        data.imgSrc = URL.createObjectURL(event.target.files[0]);
        setMultiChoiceData([...multiChoiceData])
    }

    const removeMultipleChoiceImg = (index) => {
        const data = multiChoiceData[index];
        data.imgSrc = null;
        setMultiChoiceData([...multiChoiceData])
    }

    return (
        <div>
            {
                multiChoiceData.map((x, i) => (
                    <>
                        <div className="row mt-2">
                            <div className="col-md-10">
                                <div className='d-flex align-items-center mt-3'>
                                    <div className="mutiple_option">
                                        <Radio
                                            checked={false}
                                            value="disabled"
                                            disabled
                                            name="radio-buttons"
                                        />
                                    </div>
                                    <div className="w-100">
                                        <input type="text" name="name" className='text-light-color questionType' value={x.optionName} onChange={(e) => updateMultipleChoice(e.target.value, i)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 align-self-center">
                                <div className='upload-main-img' onClick={() => { inputRef?.current.click(); setImgIndex(i) }}>
                                    <InsertPhotoOutlined className="ligthColor uploadimg" />
                                </div>
                                <input type="file" className='hiden-file' ref={inputRef} onChange={(e) => handleMultipleChoiceImg(e)} />
                            </div>
                            {
                                (i > 0 || multiChoiceData.length > 1) &&
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
                <div className="mutiple_option">
                    <Radio
                        checked={false}
                        value="disabled"
                        disabled
                        name="radio-buttons"
                    />
                </div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => setMultiChoiceData((prevState) => [...prevState, updatingMultiChoice])}>Add Option</div>
                </div>
            </div>
        </div>

    )
}

export default MultipleChoice
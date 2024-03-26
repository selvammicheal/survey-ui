import CloseRounded from "@mui/icons-material/CloseRounded"
import InsertPhotoOutlined from "@mui/icons-material/InsertPhotoOutlined"
import { Checkbox, FormControlLabel } from "@mui/material"
import { useRef, useState } from "react"
import { FormGroup } from "react-bootstrap"



const CheckBox = () => {
    const initialCheckBox = [
        {
            optionName: "Option 1",
            imgSrc: null
        }
    ]
    const [checkBoxOptionData, setcheckBoxOptionData] = useState(initialCheckBox);
    const [imgIndex, setImgIndex] = useState();
    const inputRef = useRef();

    const updatecheckBoxOptionData = {
        optionName: `Option ${checkBoxOptionData.length + 1}`,
        imaSrc: null
    }

    const updatecheckBox = (value, index) => {
        const data = checkBoxOptionData[index];
        data.optionName = value;
        setcheckBoxOptionData([...checkBoxOptionData])
    }

    const checkBoxRemoveValue = (index) => {
        const array = [...checkBoxOptionData]
        array.splice(index, 1);
        setcheckBoxOptionData([...array])
    }

    const handleCheckboxImg = (event) => {
        const data = checkBoxOptionData[imgIndex];
        data.imgSrc = URL.createObjectURL(event.target.files[0]);
        setcheckBoxOptionData([...checkBoxOptionData])
    }

    const removeCheckboxImg = (index) => {
        const data = checkBoxOptionData[index];
        data.imgSrc = null;
        setcheckBoxOptionData([...checkBoxOptionData])
    }
    return (
        <>
            {
                checkBoxOptionData.map((item, index) => {
                    return (
                        <>
                            <div className="row mt-2">
                                <div className='col-md-10'>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className="mutiple_option">
                                            <FormGroup>
                                                <FormControlLabel disabled control={<Checkbox />} />
                                            </FormGroup>
                                        </div>
                                        <div className='w-100'>
                                            <input type="text" name="name" className='text-light-color questionType' value={item.optionName} onChange={(e) => updatecheckBox(e.target.value, index)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 align-self-center">
                                    <div className='upload-main-img' onClick={() => { inputRef?.current.click(); setImgIndex(index) }}>
                                        <InsertPhotoOutlined className="ligthColor uploadimg" />
                                    </div>
                                    <input type="file" className='hiden-file' ref={inputRef} onChange={(e) => handleCheckboxImg(e)} />
                                </div>
                                {
                                    (index > 0 || checkBoxOptionData.length > 1) &&
                                    <div className="col-md-1 align-self-center close-btn" onClick={() => checkBoxRemoveValue(index)}>
                                        <CloseRounded />
                                    </div>
                                }
                            </div>
                            {
                                item.imgSrc &&
                                <div className="multiple-img-close">
                                    <div className="col-md-1 align-self-center close-btn" onClick={() => removeCheckboxImg(index)}>
                                        <CloseRounded />
                                    </div>
                                    <img className="mt-3 ms-4" style={{ height: "100px", width: "100px" }} src={item.imgSrc} alt="" />
                                </div>
                            }
                        </>
                    )
                })

            }
            <div className='d-flex align-items-end mt-3'>
                <div className="mutiple_option">
                    <FormGroup>
                        <FormControlLabel disabled control={<Checkbox />} />
                    </FormGroup>
                </div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => setcheckBoxOptionData((prevState) => [...prevState, updatecheckBoxOptionData])}>Add Option</div>
                </div>
            </div>

        </>
    )
}
export default CheckBox
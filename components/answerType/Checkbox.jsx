import useSection from "@/app/store/section"
import CloseRounded from "@mui/icons-material/CloseRounded"
import InsertPhotoOutlined from "@mui/icons-material/InsertPhotoOutlined"
import { Checkbox, FormControlLabel } from "@mui/material"
import { useRef, useState } from "react"
import { FormGroup } from "react-bootstrap"

const CheckBox = ({questionData, sectionIndex, questionIndex}) => {

    const [imgIndex, setImgIndex] = useState();
    const inputRef = useRef();

    const updateOptions = useSection((state) => state.updateOptions);

    const updatecheckBox = (value, index) => {
        updateOptions("update", "name", value, sectionIndex, questionIndex, index)
    }

    const removeCheckbox = (index) => {
        updateOptions("delete", null, null, sectionIndex, questionIndex, index)
    }

    const addCheckbox = () => {
        updateOptions("add", null, null, sectionIndex, questionIndex, null)
    }

    const handleCheckboxImg = (event) => {
        var fileName = event.target?.value;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
        if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
            updateOptions("update", "imgSrc", URL.createObjectURL(event.target.files[0]), sectionIndex, questionIndex, imgIndex);
        }else{
            alert("Only jpg/jpeg and png files are allowed!");
        }   
    }

    const removeCheckboxImg = (index) => {
        updateOptions("update", "imgSrc", null, sectionIndex, questionIndex, index);
    }
    return (
        <>
            {
                questionData?.questionData?.options?.map((item, index) => {
                    return ( 
                        <div key={index}>
                            <div className="row mt-2">
                                <div className='col-md-10'>
                                    <div className='d-flex align-items-center mt-3'>
                                        <div className="multiple_option">
                                            <FormGroup>
                                                <FormControlLabel disabled control={<Checkbox />} />
                                            </FormGroup>
                                        </div>
                                        <div className='w-100'>
                                            <input type="text" name="name" className='text-light-color questionType' value={item.name} onChange={(e) => updatecheckBox(e.target.value, index)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 align-self-center">
                                    <div className='upload-main-img' onClick={() => { inputRef?.current.click(); setImgIndex(index) }}>
                                        <InsertPhotoOutlined className="lightColor" />
                                    </div>
                                    <input type="file" accept="image/*" className='hidden-file' ref={inputRef} onChange={(e) => handleCheckboxImg(e)} />
                                </div>
                                {
                                    (index > 0 || questionData?.questionData?.options?.length > 1) &&
                                    <div className="col-md-1 align-self-center close-btn" onClick={() => removeCheckbox(index)}>
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
                        </div>
                    )
                })

            }
            <div className='d-flex align-items-end mt-3'>
                <div className="multiple_option">
                    <FormGroup>
                        <FormControlLabel disabled control= {<Checkbox />} />
                    </FormGroup>
                </div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => addCheckbox()}>Add Option</div>
                </div>
            </div>

        </>
    )
}
export default CheckBox;
import CloseRounded from "@mui/icons-material/CloseRounded";
import { Checkbox, FormControlLabel, FormGroup, Radio } from "@mui/material";
import { useState } from "react";

const CheckBoxGrid = () => {

    const [checkBoxGridRow, setCheckBoxGridRow] = useState(["Row 1"])

    const [checkBoxGridCol, setCheckBoxGridCol] = useState(["Column 1"])

    const addRows = () => {
        setCheckBoxGridRow((prevState) => [...prevState, `Row ${prevState.length + 1}`])
    }

    const addColumns = () => {
        setCheckBoxGridCol((prevState) => [...prevState, `Column ${prevState.length + 1}`])
    }

    const CheckBoxRemove = (index) => {
        const remove = [...checkBoxGridRow]
        remove.splice(index, 1);
        setCheckBoxGridRow([...remove])
    }

    const CheckCloumnRemove = (index) => {
        const arry = [...checkBoxGridCol]
        arry.splice(index, 1);
        setCheckBoxGridCol([...arry])
    }

    const rowLabelChange = (value, index) => {
        const data = [...checkBoxGridRow]
        data[index] = value;
        setCheckBoxGridRow([...data])
    }

    const colLabelChange = (value, index) => {
        const data = [...checkBoxGridCol]
        data[index] = value;
        setCheckBoxGridCol([...data])
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="multipleHeading mt-2">Row</div>
                {
                    checkBoxGridRow.map((item, index) => (

                        <div className="row mt-2">

                            <div className='d-flex align-items-center'>
                                <div className="mutiple_option">{index + 1}.</div>
                                <div className='w-100'>
                                    <input type="text" name="name" value={item} onChange={(e) => rowLabelChange(e.target.value, index)} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || checkBoxGridRow.length > 1) &&
                                    <div className="align-self-center close-btn" onClick={() => CheckBoxRemove(index)}>
                                        <CloseRounded />
                                    </div>
                                }

                            </div>

                        </div>
                    ))
                }

                <div className='d-flex align-items-end mt-3'>
                    <div className="mutiple_option">{checkBoxGridRow.length + 1}.</div>
                    <div className="w-100 ms-2">
                        <div className='add-option' onClick={() => addRows()}>Add Option</div>
                    </div>
                </div>

            </div>



            <div className="col-md-6">
                <div className="multipleHeading mt-2">Columns</div>
                {
                    checkBoxGridCol.map((item, index) => (
                        <div className="row mt-2">
                            <div className='d-flex align-items-center'>
                                <div className="mutiple_option">
                                    <FormGroup>
                                        <FormControlLabel disabled control={<Checkbox />} />
                                    </FormGroup>
                                </div>
                                <div className="w-100">
                                    <input type="text" name="name" onChange={(e) => colLabelChange(e.target.value, index)} value={item} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || checkBoxGridCol.length > 1) &&
                                    <div className="align-self-center close-btn" onClick={() => CheckCloumnRemove(index)}>
                                        <CloseRounded />
                                    </div>
                                }

                            </div>
                        </div>
                    ))
                }


                <div className='d-flex align-items-end mt-3'>
                    <div className="mutiple_option">
                        <FormGroup>
                            <FormControlLabel disabled control={<Checkbox />} />
                        </FormGroup>
                    </div>
                    <div className="w-100 ms-2">
                        <div className='add-option' onClick={() => addColumns()}>Add Option</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CheckBoxGrid;
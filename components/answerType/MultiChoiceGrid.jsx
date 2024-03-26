import CloseRounded from "@mui/icons-material/CloseRounded";
import { Radio } from "@mui/material";
import { useState } from "react";

const MultiChoiceGrid = () => {

    const [multipleChoiceGridRow, setMultipleChoiceGridRow] = useState(["Row 1"])

    const [multipleChoiceGridCol, setMultipleChoiceGridCol] = useState(["Column 1"])

    const addRows = () => {
        setMultipleChoiceGridRow((prevState) => [...prevState, `Row ${prevState.length + 1}`])
    }

    const addColumns = () => {
        setMultipleChoiceGridCol((prevState) => [...prevState, `Column ${prevState.length + 1}`])
    }

    const MultipleRemove = (index) => {
        const remove = [...multipleChoiceGridRow]
        remove.splice(index, 1);
        setMultipleChoiceGridRow([...remove])
    }

    const MultipleCloumnRemove = (index) => {
        const arry = [...multipleChoiceGridCol]
        arry.splice(index, 1);
        setMultipleChoiceGridCol([...arry])
    }

    const rowLabelChange = (value, index) => {
        const data = [...multipleChoiceGridRow]
        data[index] = value;
        setMultipleChoiceGridRow([...data])
    }

    const colLabelChange = (value, index) => {
        const data = [...multipleChoiceGridCol]
        data[index] = value;
        setMultipleChoiceGridCol([...data])
    }


    return (
        <div className="row">
            <div className="col-md-6">
                <div className="multipleHeading mt-2">Row</div>
                {
                    multipleChoiceGridRow.map((item, index) => (

                        <div className="row mt-2">

                            <div className='d-flex align-items-center'>
                                <div className="mutiple_option">{index + 1}.</div>
                                <div className='w-100'>
                                    <input type="text" name="name" onChange={(e) => rowLabelChange(e.target.value, index)} value={item} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || multipleChoiceGridRow.length > 1) &&
                                    <div className="align-self-center close-btn" onClick={() => MultipleRemove(index)}>
                                        <CloseRounded />
                                    </div>
                                }
                            </div>

                        </div>
                    ))
                }

                <div className='d-flex align-items-end mt-3'>
                    <div className="mutiple_option">{multipleChoiceGridRow.length + 1}.</div>
                    <div className="w-100 ms-2">
                        <div className='add-option' onClick={() => addRows()}>Add Option</div>
                    </div>
                </div>

            </div>



            <div className="col-md-6">
                <div className="multipleHeading mt-2">Columns</div>
                {
                    multipleChoiceGridCol.map((item, index) => (
                        <div className="row mt-2">
                            <div className='d-flex align-items-center'>
                                <div className="mutiple_option">
                                    <Radio
                                        checked={false}
                                        value="disabled"
                                        disabled
                                        name="radio-buttons"
                                    />
                                </div>
                                <div className="w-100">
                                    <input type="text" name="name" value={item} onChange={(e) => colLabelChange(e.target.value, index)} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || multipleChoiceGridCol.length > 1) &&
                                    <div className="align-self-center close-btn" onClick={() => MultipleCloumnRemove(index)}>
                                        <CloseRounded />
                                    </div>
                                }
                            </div>
                        </div>
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
                        <div className='add-option' onClick={() => addColumns()}>Add Option</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MultiChoiceGrid;
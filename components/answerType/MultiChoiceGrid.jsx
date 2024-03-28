import useSection from "@/app/store/section";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { Radio } from "@mui/material";
import { useState } from "react";

const MultiChoiceGrid = ({questionData, sectionIndex, questionIndex}) => {

    const updateRowColData = useSection((state) => state.updateRowColData);

    const addRows = () => {
        updateRowColData("addRow", null, null, sectionIndex, questionIndex, null )
    }

    const addColumns = () => {
        updateRowColData("addCol", null, null, sectionIndex, questionIndex, null )
    }

    const MultipleRemove = (index) => {
        updateRowColData("removeRow", null, null, sectionIndex, questionIndex, index )
    }

    const MultipleCloumnRemove = (index) => {
        updateRowColData("removeCol", null, null, sectionIndex, questionIndex, index )
    }

    const rowLabelChange = (value, index) => {
        updateRowColData("rowData", "name", value, sectionIndex, questionIndex, index )
    }

    const colLabelChange = (value, index) => {
        updateRowColData("colData", "name", value, sectionIndex, questionIndex, index )
    }


    return (
        <div className="row">
            <div className="col-md-6">
                <div className="multipleHeading mt-2">Row</div>
                {
                    questionData?.questionData?.rowData.map((item, index) => (

                        <div className="row mt-2">

                            <div className='d-flex align-items-center'>
                                <div className="mutiple_option">{index + 1}.</div>
                                <div className='w-100'>
                                    <input type="text" name="name" onChange={(e) => rowLabelChange(e.target.value, index)} value={item.name} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || questionData?.questionData?.rowData.length > 1) &&
                                    <div className="align-self-center close-btn" onClick={() => MultipleRemove(index)}>
                                        <CloseRounded />
                                    </div>
                                }
                            </div>

                        </div>
                    ))
                }

                <div className='d-flex align-items-end mt-3'>
                    <div className="mutiple_option">{questionData?.questionData?.rowData.length + 1}.</div>
                    <div className="w-100 ms-2">
                        <div className='add-option' onClick={() => addRows()}>Add Option</div>
                    </div>
                </div>

            </div>

            <div className="col-md-6">
                <div className="multipleHeading mt-2">Columns</div>
                {
                    questionData?.questionData?.colData.map((item, index) => (
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
                                    <input type="text" name="name" value={item.name} onChange={(e) => colLabelChange(e.target.value, index)} className='text-light-color questionType' />
                                </div>
                                {
                                    (index > 0 || questionData?.questionData?.colData.length > 1) &&
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
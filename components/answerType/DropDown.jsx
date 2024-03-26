import CloseRounded from "@mui/icons-material/CloseRounded";
import { useState } from "react";

const DropDown = () => {

    const initialDropdown = [
        {
            optionName: "Option 1"
        }
    ]
    const [dropdownOptionData, setcheckDropDown] = useState(initialDropdown)

    const updateDropdown = (value, index) => {
        const data = dropdownOptionData[index];
        data.optionName = value;
        setcheckDropDown([...dropdownOptionData])
    }
    const dropDownRemoveValue = (index) => {
        const array = [...dropdownOptionData]
        array.splice(index, 1);
        setcheckDropDown([...array])
    }

    const updateDropdownData = {
        optionName: `Option ${dropdownOptionData.length + 1}`
    }


    return (
        <>
            {
                dropdownOptionData.map((item, index) => (
                    <div className="row mt-2" key={index}>
                        <div className='col-md-11'>
                            <div className='d-flex align-items-center mt-3'>
                                <div className="mutiple_option">{index + 1}.</div>
                                <div className='w-100'>
                                    <input type="text" name="name" className='text-light-color questionType' value={item.optionName} onChange={(e) => updateDropdown(e.target.value, index)} />
                                </div>
                            </div>
                        </div>
                        {
                            (index > 0 || dropdownOptionData.length > 1) &&
                            <div className="col-md-1 align-self-center close-btn" onClick={() => dropDownRemoveValue(index)}>
                                <CloseRounded />
                            </div>
                        }
                    </div>
                ))
            }
            <div className='d-flex align-items-end mt-3'>
                <div className="mutiple_option">{dropdownOptionData.length + 1}.</div>
                <div className="w-100 ms-2">
                    <div className='add-option' onClick={() => setcheckDropDown((prevState) => [...prevState, updateDropdownData])}>Add Option</div>
                </div>
            </div>
        </>
    )
}
export default DropDown;
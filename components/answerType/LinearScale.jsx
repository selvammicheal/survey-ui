import { useState } from "react"

const { FormControl, Select, MenuItem } = require("@mui/material")

const LinearScale = () => {

    const IntialLinear = {
        startValue: 1,
        startLabel: null,
        endValue: 5,
        endLabel: null
    }

    const [linearData, setLinearData] = useState(IntialLinear);
// console.log(linearData,"linearData")
    
    const linearOnChange = (value, type) => {
        if (type === "start") {
            const data = { ...linearData }
            data.startValue = value
            setLinearData(data)
        } else if (type === "end") {
            const data = { ...linearData }
            data.endValue = value
            setLinearData(data)
        }
    }

    const linearLabelChange = (value, type) => {
        if (type === "start") {
            const data = { ...linearData }
            data.startLabel = value
            setLinearData(data)
        } else if (type === "end") {
            const data = { ...linearData }
            data.endLabel = value
            setLinearData(data)
        }
    }


    

    return (
        <FormControl fullWidth className='main-linear' >
            <div className="d-flex">
                {/* <InputLabel id="icon-select-label">Answer Type</InputLabel> */}
                <Select
                    style={{ width: "fit-content" }}
                    labelId="icon-select-label"
                    label="Icon Select"
                    defaultValue="1"
                    onChange={(e) => linearOnChange(e.target.value, "start")}
                >
                    <MenuItem value="0">
                        <span className="ms-3">0</span>
                    </MenuItem>
                    <MenuItem value="1">
                        <span className="ms-3">1</span>
                    </MenuItem>
                </Select>
                <div className="align-self-center ms-2">
                    to
                </div>
                <Select
                    style={{ width: "fit-content" }}
                    labelId="icon-select-label"
                    label="Icon Select"
                    defaultValue="5"
                    onChange={(e) => linearOnChange(e.target.value, "end")}
                >
                    {
                        [2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                            <MenuItem value={`${item}`}>
                                <span className="ms-3">{item}</span>
                            </MenuItem>
                        ))
                    }
                </Select>

            </div>
            <div className="linear-text">
                <div className="row" >
                    <div className='col-md-4'>
                        <div className='d-flex align-items-center mt-3'>
                            <div className="mutiple_option"> {linearData.startValue}</div>
                            <div className='w-100 ms-2'>
                                <input type="text" name="name" placeholder="Label (Optional)" onChange={(e) => linearLabelChange(e.target.value, "start")} className='text-light-color questionType' />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row" >
                    <div className='col-md-4'>
                        <div className='d-flex align-items-center mt-3'>
                            <div className="mutiple_option"> {linearData.endValue}</div>
                            <div className='w-100 ms-2'>
                                <input type="text" name="name" placeholder="Label (Optional)" onChange={(e) => linearLabelChange(e.target.value, "end")} className='text-light-color questionType' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </FormControl>
    )
}

export default LinearScale;
import { updateQuestionData } from "../../services/api";

const { Select, MenuItem } = require("@mui/material")

const LinearScale = ({question, sectionIndex, questionIndex, formInfo, setFormInfo}) => {
    
    const linearDataUpdate = (value, field) => {
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections[sectionIndex].questions[questionIndex].question_data[field] = value;
        setFormInfo(data);

        // api-call 
        const updateQuestionPayload = {
            question_data: data.sections[sectionIndex].questions[questionIndex].question_data
        }
        updateQuestionData(updateQuestionPayload, question?._id);
    }

    return (
        <div className="main-linear">
            <div className="d-flex">
                <Select
                    style={{ width: "fit-content" }}
                    labelId="icon-select-label"
                    label="Icon Select"
                    value={question?.question_data?.startIndex}
                    onChange={(e) => linearDataUpdate(e.target.value, "startIndex")}
                >
                    <MenuItem value={"0"}>
                        <span className="ms-3">0</span>
                    </MenuItem>
                    <MenuItem value={"1"}>
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
                    value={question?.question_data?.endIndex}
                    onChange={(e) => linearDataUpdate(e.target.value, "endIndex")}
                >
                    {
                        [2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                            <MenuItem value={item} key={index}>
                                <span className="ms-3">{item}</span>
                            </MenuItem>
                        ))
                    }
                </Select>

            </div>
            <div className="linear-text">
                <div className="row" >
                    <div className='col-md-4'>
                        <div className='d-flex align-items-center mt-2'>
                            <div className="multiple_option">{question?.question_data?.startIndex}</div>
                            <div className='w-100 ms-2'>
                                <input type="text" name="name" placeholder="Label (Optional)" value={question?.question_data?.startLabel} onChange={(e) => linearDataUpdate(e.target.value, "startLabel")} className='text-light-color questionType' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" >
                    <div className='col-md-4'>
                        <div className='d-flex align-items-center mt-3'>
                            <div className="multiple_option">{question?.question_data?.endIndex}</div>
                            <div className='w-100 ms-2'>
                                <input type="text" name="name" placeholder="Label (Optional)" value={question?.question_data?.endLabel} onChange={(e) => linearDataUpdate(e.target.value, "endLabel")} className='text-light-color questionType' />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LinearScale;
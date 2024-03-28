import useSection from "@/app/store/section"
import AddCircleOutlineTwoTone from "@mui/icons-material/AddCircleOutlineTwoTone"
import Image from "@mui/icons-material/Image"
import SplitscreenTwoTone from "@mui/icons-material/SplitscreenTwoTone"
import TextFieldsTwoTone from "@mui/icons-material/TextFieldsTwoTone"

const FloatBar = (props) => {

    const addNewQuestion = useSection((state) => state.addNewQuestion);
    return (
        <div className="sideAddMenu">
            <div onClick={(e) => {e.stopPropagation; addNewQuestion(props.sectionIndex, props.questionIndex)}}><AddCircleOutlineTwoTone /></div>
            <div><TextFieldsTwoTone /></div>
            <div><Image /></div>
            <div><SplitscreenTwoTone /></div>
        </div>
    )
}

export default FloatBar
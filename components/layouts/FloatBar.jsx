import AddCircleOutlineTwoTone from "@mui/icons-material/AddCircleOutlineTwoTone"
import Image from "@mui/icons-material/Image"
import SplitscreenTwoTone from "@mui/icons-material/SplitscreenTwoTone"
import TextFieldsTwoTone from "@mui/icons-material/TextFieldsTwoTone"

const FloatBar = ({setCount}) => {


    return (
        <div className="sideAddMenu">
            <div className="m-3" onClick={() => setCount((prev) => prev + 1)}><AddCircleOutlineTwoTone /></div>
            <div className="m-3"><TextFieldsTwoTone /></div>
            <div className="m-3"><Image /></div>
            <div className="m-3"><SplitscreenTwoTone /></div>
        </div>
    )
}

export default FloatBar
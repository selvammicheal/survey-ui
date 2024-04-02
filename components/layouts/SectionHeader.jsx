import useSection from "@/app/store/section";
import { DeleteOutlined } from "@mui/icons-material";
import FloatBar from "./FloatBar";

const SectionHeader = ({ section, sectionIndex }) => {

    const formData = useSection((state) => state.formData);
    const updateActiveContent = useSection((state) => state.updateActiveContent);
    const updateSectionData = useSection((state) => state.updateSectionData);

    const renderHeader = () => {
        return(
            <>
                <div className="row">
                    <div className="col-md-11">
                        <input
                            type="text"
                            className='text-light-color dark-text'
                            value={section?.sectionTitle}
                            autoFocus={true}
                            onChange={(e) => updateSectionData(e.target.value, "sectionTitle", sectionIndex)}
                        />
                    </div>
                    <div className=" col-md-1 align-self-center">
                        <div className="mainss">
                            <DeleteOutlined />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <input
                            className="text-light-color"
                            style={{ fontSize: "15px" }}
                            type="text"
                            placeholder="Description"
                            value={section?.sectionDesc}
                            onChange={(e) => updateSectionData(e.target.value, "sectionDesc", sectionIndex)}
                        />
                    </div>
                </div>
            </>
        )
    }

    const renderHeaderPreview = () => {
        return (
            <>
                <div className='short-question'>
                    <div className="question-heading ms-2 mb-2">
                        {section.sectionTitle}
                    </div>
                    <div className="ms-2 mt-3 text-light-color" style={{ fontSize: "15px" }}>
                        {section.sectionDesc     ? section.sectionDesc   : "Description(optional)"
                        }
                    </div>
                </div>
            </>
        )
    }

    const updateActiveContentFunc = (type, sectionIndex) => {
        updateActiveContent(sectionIndex, null, type);
    }

    return (
        <div className={`main-form-heading ${formData?.sections.length > 1 ? "active" : ""}`} data-custom={`Section ${sectionIndex + 1} of ${formData?.sections.length}`} style={{ marginTop: "150px" }}>
            <div className={`main-form-wrap ${!section?.sectionActive && "left-border-0"}`} style={{ position: "relative" }} onClick={() => updateActiveContentFunc("section", sectionIndex)}>
                {
                    section?.sectionActive ? renderHeader() : renderHeaderPreview()
                }
                
                {
                    section.sectionActive ? <FloatBar sectionIndex={sectionIndex} questionIndex={null} clickedFrom={"section"} /> : <></>
                }
            </div>
        </div>
    )
}

export default SectionHeader;
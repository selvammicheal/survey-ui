import useSection from "../../app/store/section";
import { DeleteOutlined } from "@mui/icons-material";
import FloatBar from "./FloatBar";
import { useState } from "react";
import { deleteSectionData, updateSectionData } from "../../services/api";

const SectionHeader = ({ section, sectionIndex, formInfo, setFormInfo, questionTypes }) => {
    
    const activeContent = useSection((state) => state.activeContent);
    const updateActiveSlide = useSection((state) => state.updateActiveSlide);
    
    const updateSectionDetails = (value, field) => {

        if(field === "name" && value === "") value = null;

        //update local state
        const data = {...formInfo};
        data.sections[sectionIndex][field] = value;
        setFormInfo(data)

        // api-call
        const payload = {
            [field]: value
        }
        updateSectionData(payload, section._id);
    }

    const changeActiveSlideOnDelete = () => {
        if(formInfo?.sections.length <= 2){
            updateActiveSlide(null, null);
        } else {
            updateActiveSlide(sectionIndex , null)
        }
    }

    const deleteSection = (e) => {
        e.stopPropagation();

        // update local state 
        const data = JSON.parse(JSON.stringify(formInfo));
        data.sections.splice(sectionIndex,1);
        setFormInfo(data);

        // api-call 
        deleteSectionData(section?._id);

        changeActiveSlideOnDelete()
    }

    const renderHeader = () => {
        return (
            <>
                <div className="row">
                    <div className="col-md-11">
                        <input
                            type="text"
                            className='text-light-color dark-text'
                            value={section?.name}
                            autoFocus={true}
                            placeholder="Untitled Section"
                            onChange={(e) => updateSectionDetails(e.target.value, "name")}
                        />
                    </div>
                    <div className=" col-md-1 align-self-center">
                        <div style={{cursor: "pointer"}} onClick={(e) => deleteSection(e)}>
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
                            value={section?.description}
                            onChange={(e) => updateSectionDetails(e.target.value, "description")}
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
                        {section.name}
                    </div>
                    <div className="ms-2 mt-3 text-light-color" style={{ fontSize: "15px" }}>
                        {section.description ? section.description : "Description(optional)"}
                    </div>
                </div>
            </>
        )
    }

    const sectionActive = activeContent?.sectionIndex === sectionIndex && activeContent?.questionIndex === null

    return (
        <div className={`main-form-heading ${formInfo?.sections.length > 1 ? "active" : ""}`} data-custom={`Section ${sectionIndex + 1} of ${formInfo?.sections.length}`} style={{ marginTop: "150px" }}>
            <div className={`main-form-wrap ${!sectionActive && "left-border-0"}`} style={{ position: "relative" }} onClick={() => updateActiveSlide(sectionIndex, null)}>
                {
                    !sectionActive ? renderHeaderPreview() : renderHeader()
                }

                {
                    sectionActive ?
                        <FloatBar
                            sectionIndex={sectionIndex}
                            questionIndex={null}
                            clickedFrom={"section"}
                            questionTypes={questionTypes}
                            formInfo={formInfo}
                            setFormInfo={setFormInfo} />
                        : <></>
                }
            </div>
        </div>
    )
}

export default SectionHeader;
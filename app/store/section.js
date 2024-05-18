import { create } from "zustand";
import { updateActiveSlide } from "./stateFunctions";

const useSection = create((set, get) => ({
    activeContent: {
        sectionIndex: 0,
        questionIndex: 0
    },

    updateActiveSlide: (sectionIndex, questionIndex, from) => updateActiveSlide(sectionIndex, questionIndex, set, from ),

}));

export default useSection;
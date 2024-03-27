import { create } from "zustand";

const useSection = create((set) => ({
 section: 0,
 addSection: () => console.log("ADDD"),
 removeSection: () => console.log("Remove"),
}));

export default useSection;
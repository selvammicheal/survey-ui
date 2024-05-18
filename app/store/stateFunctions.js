export const updateActiveSlide = (sectionIndex, questionIndex, set) => {
    set(() => (
        {
            activeContent: {
                sectionIndex: sectionIndex,
                questionIndex: questionIndex
            }
        }
    ))
}
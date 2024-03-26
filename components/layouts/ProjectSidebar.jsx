import React, { useState } from 'react';



function ProjectSidebar(props) {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="projectsidebar">
        </div>
    );
}

export default ProjectSidebar;

import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Brand from '../../public/images/agl_logo_white.svg'
import Image from 'next/image';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import ArticleIcon from '@mui/icons-material/Article';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Link from 'next/link';


function Sidebar(props) {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isExpanded ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
            </button>
            <div className="content">
                {
                    isExpanded ?
                        <div>
                            <div style={{ display: "flex", alignItems: "center", paddingBottom: "2rem" }}>
                                <Image src={Brand} alt="profile" width={40} height={40} className='nav-profile-img' />
                                <div style={{ paddingLeft: "1rem" }}>
                                    <p>Last Login:</p>
                                    <p>18-03-2024 09:05 AM</p>
                                </div>
                            </div>
                            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" ,color:"white",textDecoration:"none"}}>
                                <BorderAllIcon style={{ marginRight: "1.5rem" }} />
                                <p>Dashboard</p>
                            </Link>
                            <div style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" }}>
                                <EditCalendarIcon style={{ marginRight: "1.5rem" }} />
                                <p>Attendance</p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" }}>
                                <ArticleIcon style={{ marginRight: "1.5rem" }} />
                                <p>Timesheet</p>
                            </div>
                            <Link href="/projectmanagement" style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" ,color:"white",textDecoration:"none"}}>
                                <AccountTreeIcon style={{ marginRight: "1.5rem" }} />
                                <p>Project Management</p>
                            </Link>
                            <Link href="/survey" style={{ display: "flex", alignItems: "center", paddingBottom: "1rem" ,color:"white",textDecoration:"none"}}>
                                <ChecklistIcon style={{ marginRight: "1.5rem" }} />
                                <p>Survey</p>
                            </Link>
                        </div>
                        :
                        <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "2rem" }}>
                            <Image src={Brand} alt="profile" width={40} height={40} className='nav-profile-img' />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "1rem" }}>
                            <BorderAllIcon  />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "1rem" }}>
                            <EditCalendarIcon />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "1rem" }}>
                            <ArticleIcon />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "1rem" }}>
                            <AccountTreeIcon  />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "1rem" }}>
                            <ChecklistIcon  />
                        </div>
                    </div>
                    
                }
            </div>
        </div>
    );
}

export default Sidebar;

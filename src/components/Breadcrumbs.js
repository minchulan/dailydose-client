import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    let currentLink = '';
    const crumbs = location.pathname
        .split("/")
        .filter((crumb) => crumb !== "")
        .map((crumb) => {
        currentLink += `/${crumb}`;
            return (
                <div className="crumb" key={crumb}>
                    <Link to={currentLink}>{crumb}</Link>
                </div>
            );
        });
    
    return (
        <div className="breadcrumbs">
            {crumbs}
        </div>
    )
}

export default Breadcrumbs


// NOTES: -----------------------------------------
// /help/contact ==> help | contact 
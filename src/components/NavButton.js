import React, { useContext } from 'react';
import { DeskContext } from './DeskProvider';

const NavButton = ({handler=false, title, show=true, action, iconClass, buttonClass}) => {
    const { handlers } = useContext(DeskContext);
    return show&&<button type="button" className={buttonClass} data-action={action} onClick={()=>handler?handlers[handler](action):null} title={title}>
            <span className={`fa ${iconClass}`}>&nbsp;</span>
        </button>
};

export default NavButton;
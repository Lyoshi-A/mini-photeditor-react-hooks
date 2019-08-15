import React from 'react';
import NavButton from './NavButton';
import './Navbar.css'
import {useCountRenders} from '../hooks/use.count.render'

export const Navbar = React.memo(({data}) => {
    console.log('Navbar', data)
    const downloadable = true;
    // data() {
    //     return {
    //         downloadable: typeof document.createElement('a').download !== 'undefined',
    //     };
    // },

   useCountRenders('Navbar')
   return <div className="navbar">
            <nav className="nav">
                <NavButton handler='upload' show={!data.loaded} action="upload" title="Upload (U)" iconClass="fa-upload"  buttonClass="nav__button" />
                <NavButton handler='recognize' show={data.cropped} action="recognize" title="Recognize (T)" iconClass="fa-file-text" buttonClass="nav__button" />
                <NavButton handler='restore' show={data.cropped} action="restore" title="Undo (Ctrl + Z)" iconClass="fa-undo" buttonClass="nav__button" />
                <NavButton handler='reset' show={data.loaded && !data.cropping} action="reset" title="Delete (Delete)" iconClass="fa-trash" buttonClass="nav__button nav__button--danger" />
                <NavButton handler='clear' show={data.cropping} action="clear" title="Cancel (Esc)" iconClass="fa-ban" buttonClass="nav__button nav__button--danger" />
                <NavButton handler='crop' show={data.cropping} action="crop" title="OK (Enter)" iconClass="fa-check" buttonClass="nav__button nav__button--success" />
                <NavButton handler='download' show={downloadable && data.loaded} action="download" title="Download (D)" iconClass="fa-download" download={data.name} href={data.url} buttonClass="nav__button nav__button--success" />
            </nav>
        </div>
})
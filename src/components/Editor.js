import React, { useContext } from 'react';
// import {Modal} from './Modal';
import NavButton from './NavButton';
import { DeskContext } from './DeskProvider';
import './Editor.css'
import {useCountRenders} from '../hooks/use.count.render'

const NavEditorPanel = ({handlers}) => {
    return <div className="toolbar" onClick={handlers.NavClick}>
        <NavButton action="move" title="Move (M" iconClass="fa-arrows" buttonClass="toolbar__button" />
        <NavButton action="crop" title="Crop (C)" iconClass="fa-crop" buttonClass="toolbar__button" />
        <NavButton action="zoom-in" title="Zoom In (I)" iconClass="fa-search-plus" buttonClass="toolbar__button" />
        <NavButton action="zoom-out" title="Zoom Out (O)" iconClass="fa-search-minus" buttonClass="toolbar__button" />
        <NavButton action="rotate-left" title="Rotate Left (L)" iconClass="fa-rotate-left" buttonClass="toolbar__button" />
        <NavButton action="rotate-right" title="Rotate Right (R)" iconClass="fa-rotate-right" buttonClass="toolbar__button" />
        <NavButton action="flip-horizontal" title="Flip Horizontal (H)" iconClass="fa-arrows-h" buttonClass="toolbar__button" />
        <NavButton action="flip-vertical" title="Flip Vertical (V)" iconClass="fa-arrows-v" buttonClass="toolbar__button" />
    </div>
}

export const Editor = React.memo(({data}) => {
  const { handlers, imageRef } = useContext(DeskContext);
    useCountRenders('Loader')
  return <div className="editor">
            <NavEditorPanel handlers={handlers} />
            <div className="canvas" onDoubleClick={handlers.dblclick}>
                <img ref={imageRef} alt={data.name} src={data.url} onLoad={handlers.start} />
            </div>
            {/*<Modal onChange={handlers.change} />*/}
        </div>
})


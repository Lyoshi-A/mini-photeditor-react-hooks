import React, { useContext } from 'react';
import './Loader.css'
import { DeskContext } from './DeskProvider';
import {useCountRenders} from '../hooks/use.count.render'

export const Loader = React.memo(({data}) => {
    const { fileRef, updateData } = useContext(DeskContext);
    const read = (files) => {
            return new Promise((resolve, reject) => {
                if (!files || files.length === 0) {
                    resolve();
                    return;
                }

                const file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    if (URL) {
                        resolve({
                            loaded: true,
                            name: file.name,
                            type: file.type,
                            url: URL.createObjectURL(file),
                        });
                    } else {
                        reject(new Error('Your browser is not supported.'));
                    }
                } else {
                    reject(new Error('Please choose an image file.'));
                }
            });
        }
    useCountRenders('Loader')
    const change = ({ target }) => {
        read(target.files).then((data) => {
            target.value = '';
            updateData(data);
        }).catch((e) => {
            target.value = '';
            alert(e);
        });
    }

     const dragover = (e) => {
        e.preventDefault();
     }

     const drop = (e) => {
        e.preventDefault();
        read(e.dataTransfer.files).then((data) => {
            // target.value = '';
            updateData(data);
        }).catch((e) => {
            // target.value = '';
            alert(e);
        });
     }

     const alert = (e) => {
        window.alert(e && e.message ? e.message : e);
     }


     return <div className="loader" onChange={change} onDragOver={dragover} onDrop={drop}>
            <p>Drop image here or
                <label className="browse">browse...
                    <input className="sr-only" id="file" ref={fileRef} type="file" accept="image/*" />
                </label>
            </p>
            <div className="hint">
                <div className="row"><b>Keyboard shortcuts</b></div>
                <div className="row"><div>Delete</div><div>Del</div></div>
                <div className="row"><div>Cancel Action</div><div>Esc</div></div>
                <div className="row"><div>Apply selection</div><div>Enter</div></div>
                <div className="row"><div>Move image mode</div><div>M</div></div>
                <div className="row"><div>Crop image mode</div><div>C</div></div>
                <div className="row"><div>Zoom in</div><div>I</div></div>
                <div className="row"><div>Zoom out</div><div>O</div></div>
                <div className="row"><div>Rotate Left</div><div>L</div></div>
                <div className="row"><div>Rotate Right</div><div>R</div></div>
                <div className="row"><div>Flip Horizontal</div><div>H</div></div>
                <div className="row"><div>Flip Vertical</div><div>V</div></div>
                <div className="row"><div>Recognize</div><div>T</div></div>
                <div className="row"><div>Undo</div><div>Ctrl+Z</div></div>
                <div className="row"><div>Upload image</div><div>Ctrl+U</div></div>
            </div>
        </div>
})
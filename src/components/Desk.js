import React, {useContext} from 'react';
import {Navbar} from './Navbar';
import {Loader} from './Loader';
import {Editor} from './Editor';
import './Desk.css'
import {DeskContext} from "./DeskProvider";
import {useCountRenders} from '../hooks/use.count.render'

const Desk = React.memo(() => {
   const { image } = useContext(DeskContext);
     // const dt = {
     //     showModal: false,
     //     text: '',
     // }
    useCountRenders('Desk')
 const imageContainer =  (image.loaded)?<Editor data={image} />: <Loader data={image} />
 return <div className="app">
        <header className="header">
            <span className="title">Proto Editor</span>
            <Navbar data={image} />
        </header>
        <main className="main">
            {imageContainer}
        </main>
    </div>
})

export default Desk;
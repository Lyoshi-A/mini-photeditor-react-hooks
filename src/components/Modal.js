import React from 'react';
import './Modal.css'
import {useCountRenders} from '../hooks/use.count.render'

export const Modal = props => {
    // props: {
    //     data: {
    //         type: Object,
    //     default: () => ({}),
    //     },
    // },
    //
    // data:()=>({
    //     text: 'Loading...',
    //     isShow : false
    // }),
    // const classObject = () => {
    //     return {
    //         'modal-hide': !this.isShow,
    //         'modal-show': this.isShow
    //     }
    // }
    //
     const show = () =>  {
            this.isShow = true;
     }

     const hide = () => {
            this.isShow = false;
     }
    //
    //  const setText = (text) => {
    //         this.text = text;
    //  }
    //
     const click = ({ target }) => {
            const action = target.getAttribute('data-action') || target.parentElement.getAttribute('data-action');
            // if (action) {
            // }
     }

  useCountRenders('Modal')
  return <div className="modal-mask modal-hide">
                  <div className="modal-wrapper">
                      <div className="modal-header">
                       <button className="modal-default-button" data-action="close" onClick={click}>X</button>
                     </div>
                      <div className="modal-container">
                          <textarea />
                      </div>
                  </div>
              </div>
}
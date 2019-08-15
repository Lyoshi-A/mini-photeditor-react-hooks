import React, {useState, useRef, useEffect, useCallback} from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export const DeskContext = React.createContext();

const DeskProvider = props => {
   const cropper = useRef(null);
   const imageRef = useRef(null);
   const fileRef = useRef(null);
   // const image = useRef({
   //     cropped: false,
   //     cropping: false,
   //     loaded: false,
   //     name: '',
   //     previousUrl: '',
   //     type: '',
   //     url: '',
   //     data:{
   //         canvasData: null,
   //         cropBoxData: null,
   //         croppedData: null,
   //         cropper: null,
   //     }});
   const [image, setImage] = useState({
                    cropped: false,
                    cropping: false,
                    loaded: false,
                    name: '',
                    previousUrl: '',
                    type: '',
                    url: '',
                    data:{
                      canvasData: null,
                      cropBoxData: null,
                      croppedData: null,
                      cropper: null,
                    }
            });
   const updateData = useCallback ((data) => {
       // console.log('before:',image)
       // Object.assign(image, data);
       // console.log('after:',image)
       setImage(current => ({...current, ...data}))
   }, [setImage] );
  // const [functionType, setFunctionType] = useState('');
  useEffect(()=>{
    window.addEventListener('keydown', handlers.keydown);
    return () => {
      window.removeEventListener('keydown', handlers.keydown);
      handlers.stop();
    }
  }, [])

  const handlers = {
    NavClick: ({ target }) => {
      console.log('handlers onClick')
             const action = target.getAttribute('data-action') || target.parentElement.getAttribute('data-action');
             console.log('action ', action);

             switch (action) {
                 case 'move':
                 case 'crop':
                     cropper.current.setDragMode(action);
                     break;

                 case 'zoom-in':
                     cropper.current.zoom(0.1);
                     break;

                 case 'zoom-out':
                     cropper.current.zoom(-0.1);
                     break;

                 case 'rotate-left':
                     cropper.current.rotate(-1);
                     break;

                 case 'rotate-right':
                     cropper.current.rotate(1);
                     break;

                 case 'flip-horizontal':
                     cropper.current.scaleX(-cropper.current.getData().scaleX || -1);
                     break;

                 case 'flip-vertical':
                     cropper.current.scaleY(-cropper.current.getData().scaleY || -1);
                     break;

                 case 'close':
                     // Modal.hide();
                    break;

                 default:
             }
         },

     onChange: () =>  {
             console.log('handlers onChange')
             // const { modal } = this.$refs;
             // modal.hide();
         },

      keydown: (e, data) => {
             console.log('handlers keydown', e.key, data)
             switch (e.key) {
                 // Undo crop
                 case 'z':
                     if (e.ctrlKey) {
                         e.preventDefault();
                         handlers.restore();
                     }
                     break;

                 case 'u':
                     if (e.ctrlKey) {
                         e.preventDefault();
                         handlers.upload();
                     }
                     break;

                 case 'd':
                     if (e.ctrlKey) {
                         e.preventDefault();
                         handlers.restore();
                     }
                     break;

                 // Delete the image
                 case 'Delete':
                     handlers.reset();
                     break;

                 // Recognize
                 case 't':
                     handlers.recognize();
                     break;

                 // case 'Escape':
                 //     handlers.change();
                 //     break;

                 default:
             }

             if (!cropper.current) {
                 return;
             }

             switch (e.key) {
                 // Crop the image
                 case 'Enter':
                     handlers.crop();
                     break;

                 // Clear crop area
                 case 'Escape':
                     handlers.clear();
                     break;

                 // Move to the left
                 case 'ArrowLeft':
                     e.preventDefault();
                     cropper.current.move(-1, 0);
                     break;

                 // Move to the top
                 case 'ArrowUp':
                     e.preventDefault();
                     cropper.current.move(0, -1);
                     break;

                 // Move to the right
                 case 'ArrowRight':
                     e.preventDefault();
                     cropper.current.move(1, 0);
                     break;

                 // Move to the bottom
                 case 'ArrowDown':
                     e.preventDefault();
                     cropper.current.move(0, 1);
                     break;

                 // Enter crop mode
                 case 'c':
                     cropper.current.setDragMode('crop');
                     break;

                 // Enter move mode
                 case 'm':
                     cropper.current.setDragMode('move');
                     break;

                 // Zoom in
                 case 'i':
                     cropper.current.zoom(0.1);
                     break;

                 // Zoom out
                 case 'o':
                     cropper.current.zoom(-0.1);
                     break;

                 // Rotate left
                 case 'l':
                     cropper.current.rotate(-90);
                     break;

                 // Rotate right
                 case 'r':
                     cropper.current.rotate(90);
                     break;

                 // Flip horizontal
                 case 'h':
                     cropper.current.scaleX(-cropper.current.getData().scaleX || -1);
                     break;

                 // Flip vertical
                 case 'v':
                     cropper.current.scaleY(-cropper.current.getData().scaleY || -1);
                     break;

                 default:
             }
         },

         onDblClick: (e) => {
           console.log('handlers onDblClick')
             // if (e.target.className.indexOf('cropper-face') >= 0) {
             //     e.preventDefault();
             //     e.stopPropagation();
             //     this.crop();
             // }
         },

         start: () => {
            console.log('handlers start')
             const {data} = image;

             if (image.cropped) {
                 return;
             }
             console.log('start imageRef.current', imageRef.current.image, imageRef.current)
             cropper.current = new Cropper(imageRef.current, {
                 autoCrop: false,
                 dragMode: 'crop',
                 background: false,

                 ready: () => {
                     if (data.croppedData) {
                         data.cropper
                             .crop()
                             .setData(data.croppedData)
                             .setCanvasData(data.canvasData)
                             .setCropBoxData(data.cropBoxData);

                         data.croppedData = null;
                         data.canvasData = null;
                         data.cropBoxData = null;
                         updateData({data: data});
                     }
                 },

                 crop: ({ detail }) => {
                     if (detail.width > 0 && detail.height > 0 && !image.cropping) {
                         updateData({
                             cropping: true,
                         });
                     }
                 },
             });
         },

         stop: () => {
           console.log('handlers stop')
             if (cropper.current) {
                 cropper.current.destroy();
                 cropper.current = null;
             }
         },

         crop: () =>  {
           console.log('handlers crop', image.cropping)
             if (image.cropping) {
               updateData({
                     cropped: true,
                     cropping: false,
                     previousUrl: image.url,
                     url: cropper.current.getCroppedCanvas(image.type === 'image/png' ? {} : {
                         fillColor: '#fff',
                     }).toDataURL(image.type),
                     data: {
                        croppedData: cropper.current.getData(),
                        canvasData: cropper.current.getCanvasData(),
                        cropBoxData: cropper.current.getCropBoxData()
                     }
                 });
                handlers.stop();
             }
         },

         clear: () => {
           console.log('handlers clear')
           console.log('clear data', image)
             if (image.cropping) {
                 cropper.current.clear();
                 updateData({
                     cropping: false,
                 });
             }
         },

         restore: () =>  {
            console.log('handlers restore')
             if (image.cropped) {
               updateData({
                     cropped: false,
                     previousUrl: '',
                     url: image.previousUrl,
                 });
             }
         },

         reset: () =>  {
           console.log('handlers reset')
             handlers.stop();
             updateData({
                 cropped: false,
                 cropping: false,
                 loaded: false,
                 name: '',
                 previousUrl: '',
                 type: '',
                 url: '',
             });
         },

         recognize: () => {
             console.log('handlers recognize:')
             // const { modal } = this.$refs;
             // console.log('recognize......');
             //
             // modal.show();

             // RecognizeService.process({
             //     image: this.data.url,
             //     imageName: this.data.name,
             //     type: this.data.type
             // })
             //     .then ( response => {
             //         modal.setText(response.data.message);
             //     })
             //     .catch ( error => {
             //         console.log(error);
             //     });
         },

         update: (data) => {
           console.log('handlers update')
           updateData(data)
             // Object.assign(this.data, data);
         },
          upload: (data) => {
            console.log('handlers upload')
            fileRef.current.click();
            // Object.assign(this.data, data);
          },
          download: (data) => {
            console.log('handlers download')
            // Object.assign(this.data, data);
          },
          move: (data) => {
            console.log('handlers move',data)
            // Object.assign(this.data, data);
          },
  }

  return (
    <DeskContext.Provider value={{
        handlers,
        image,
        updateData,
        imageRef,
        fileRef
      }}
    >
      {props.children}
    </DeskContext.Provider>
  );
};

export default DeskProvider;

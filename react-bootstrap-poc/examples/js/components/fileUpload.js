import React from 'react';
import FileUploadProgress from 'react-fileupload-progress';
class fileUpload extends React.Component {

    render() {
      return (
        <div className='panel panel-primary'>
          <div className='panel-heading'><h4>FileUpload</h4></div>
          <div className='panel-body'>
              <FileUploadProgress key='ex1' url='http://localhost:3000/api/upload'
                  onProgress={ (e, request, progress) => { console.log('progress', e, request, progress); } }
                  onLoad={ (e, request) => { console.log('load', e, request); } }
                  onError={ (e, request) => { console.log('error', e, request); } }
                  onAbort={ (e, request) => { console.log('abort', e, request); } } />
          </div>
        </div>
      );
    }
}
export default fileUpload;

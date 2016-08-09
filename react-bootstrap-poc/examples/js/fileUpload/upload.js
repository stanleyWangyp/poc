import React from 'react';
class FileUploadInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: false,
      file: false,
      progress: null
    };
  }

  beginUpload() {
    const that = this;
    const formData = new FormData();
    const request = new XMLHttpRequest();
    formData.append(this.props.name, this.state.file);
    request.onload = function() {
      that.setState({ result: 'File was uploaded successfully' });
    };
    request.onerror = function() {
      that.setState({ error: true, result: 'Upload failed.' });
    };
    request.upload.onprogress = function(oEvent) {
      if (oEvent.lengthComputable) {
        that.setState({ progress: Math.max(1, Math.ceil( 100 * (oEvent.loaded / oEvent.total))) });
      }
    };
    request.open('POST', this.props.url);
    request.responseType = 'json';
    request.send(formData);
    that.setState({ progress: 0 });
  }

  onChange(event) {
    const r = new RegExp(this.props.filter, 'i');
    const file = event.target.files[0];
    if (!(file.type || '').match(r)) {
      alert('Invalid file name, ' + this.props.filter + ' is expected');
      return false;
    }
    this.setState({ file: file });
    return false;
  }

  result() {
    const html = [ (<div className={ 'alert ' + (this.state.error ? 'alert-danger' : 'alert-success') }>{ this.state.result }</div>) ];
    if (this.state.error) {
      html.push(<button className='btn btn-default' onClick= { this.beginUpload }>Retry upload</button>);
    }
    return html;
  }

  render() {
    const file = this.state.file;
    if (this.state.result) {
      return (
        <div>
          <div>{ this.result() }</div>
        </div>
      );
    } else if (typeof this.state.progress === 'number') {
      return (
        <div>
        <div>Upload file { file.name } ({ file.size }).</div>
          <div>Uploading { this.state.progress }%</div>
        </div>
      );
    } else if (file) {
      return (
          <div>
          <div>Upload file { file.name } ({ file.size }).</div>
          <div><button className='btn btn-default' onClick={ this.beginUpload }>Begin upload</button></div>
          </div>
        );
    }
    return (
        <div>
        <input type='file' onChange={ this.onChange } value={ this.state.value } />
        </div>
    );
  }
}
export default FileUploadInput;


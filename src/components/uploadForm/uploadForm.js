
import React, { Component } from 'react';
import helpers from '../../helpers';

class UploadForm extends Component {

  onSendFile = (ev) => {
    ev.preventDefault();
    console.log('send file');
    const formData = new FormData();
    
    formData.append('file', this.refs._file.files[0]);
    
    helpers.sendData(ev.target.action, formData).then(result => {
      console.log(result);
    });
  }

  render() {
    return (
      <form action = {helpers.API.UPLOAD}
        className = "upload-form"
        encType = "multipart/form-data"
        method = "post"
        onSubmit = {this.onSendFile}
      >
        <input className = "upload-form__fileinput" type="file" ref="_file" />
        <button className = "upload-form__sendbtn" type="submit">Send</button>
      </form>        
    );
  };
}

export default UploadForm;
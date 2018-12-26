import React from 'react';

export default class Upload extends React.Component{

    titleInput = React.createRef();
    descriptionInput = React.createRef();
    fileInput = React.createRef();

    uploadVideo = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append('video', this.fileInput.current.files[0]);
        form.append('filename', this.fileInput.current.files[0].name);
        form.append('title', this.titleInput.current.value);
        form.append('description', this.descriptionInput.current.value);

        fetch('http://localhost:8080/upload', {
          method: 'POST',
          body: form
        }).then(response => {
          return response.json();
        }).then((uploadResp) => {
            console.log('Succesfully uploaded:');
            console.log(uploadResp);
          }).catch((err) => {
              console.error("Caught error: ", err);
          });

          this.titleInput.current.value = "";
          this.descriptionInput.current.value = "";
          this.fileInput.current.value = null;
      }

    render(){
        return (
            <div className='upload__main'>
                <div className='upload__middle'>
                    <div className='upload__middle--left'>
                    </div>
                    <div className='upload__middle--right'>
                        <form className='upload-form' onSubmit={this.uploadVideo}>
                            <h3>Upload Video:</h3>
                            <label>Title:</label>
                            <input type='text' name='video-title' placeholder='Add a title to your video' ref={this.titleInput} />
                            <label>Description:</label>
                            <textarea name="video-description" placeholder='Add a description to your video' ref={this.descriptionInput} />
                            <input type='file' name='video-file' ref={this.fileInput} />
                            <input type='submit' value='Publish'/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
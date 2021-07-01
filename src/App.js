import React, { Component } from 'react';
import './App.css';
import ImageCrop from './library/imageCrop';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfilePic: '',
      editor: null,
      scaleValue: 1,
    };
  }

  setEditorRef = (editor) => this.setState({ editor });

  onCrop = () => {
    const { editor } = this.state;
    if (editor !== null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      console.log(url);
      this.setState({ userProfilePic: url });
    }
  };

  onScaleChange = (scaleChangeEvent) => {
    const scaleValue = parseFloat(scaleChangeEvent.target.value);
    this.setState({ scaleValue });
  };

  profilePicChange = (fileChangeEvent) => {
    const file = fileChangeEvent.target.files[0];
    const { type } = file;
    if (
      !(
        type.endsWith('jpeg') ||
        type.endsWith('png') ||
        type.endsWith('jpg') ||
        type.endsWith('gif')
      )
    ) {
    } else {
      this.setState({
        openCropper: true,
        selectedImage: fileChangeEvent.target.files[0],
        fileUploadErrors: [],
      });
    }
  };
  render() {
    return (
      <div className='App'>
        <input
          type='file'
          name='profilePicBtn'
          accept='image/png, image/jpeg'
          onChange={this.profilePicChange}
        />
        <ImageCrop
          imageSrc={this.state.selectedImage}
          setEditorRef={this.setEditorRef}
          onCrop={this.onCrop}
          scaleValue={this.state.scaleValue}
          onScaleChange={this.onScaleChange}
        />

        <img
          src={this.state.userProfilePic}
          alt='Profile'
          style={{ borderRadius: '50%' }}
        />
      </div>
    );
  }
}

export default App;

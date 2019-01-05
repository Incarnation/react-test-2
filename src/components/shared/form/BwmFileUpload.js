import React from "react";

//file upload component
export class BwmFileUpload extends React.Component {
  constructor(props) {
    super(props);

    //initilizae a file reader
    this.setupReader();

    //initial state
    this.state = {
      selectedFile: undefined,
      imageBase64: ""
    };

    //bind context
    this.onChange = this.onChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  //initilizae a file reader function definition
  setupReader() {
    this.reader = new FileReader();

    //listen to the event
    this.reader.addEventListener("load", event => {
      //debugger;
      //get the base64 image data and set it to the state
      this.setState({ imageBase64: event.target.result });
    });
  }

  //this function is called when user select an file
  //on the UI
  onChange(event) {
    //deconstruct input first and then deconstruct onChange from input from props
    const {
      input: { onChange }
    } = this.props;

    //debugger;

    //get the first file from event target
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.setState({ selectedFile: selectedFile });

      //the reader will read our file we just selected
      //will transform the file to base64
      //will fire the event 'load'
      this.reader.readAsDataURL(selectedFile);
    }
  }

  uploadImage() {}

  render() {
    const {
      label,
      meta: { touched, error }
    } = this.props;
    const { selectedFile, imageBase64 } = this.state;

    return (
      <div className="img-upload-container">
        <label className="img-upload btn btn-bwm">
          <span className="upload-text">Select an image</span>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
          />
        </label>

        {selectedFile && (
          <button
            className="btn btn-success btn-upload"
            type="button"
            disabled={!selectedFile}
            onClick={() => {
              this.uploadImage();
            }}
          >
            Upload Image
          </button>
        )}
      </div>
    );
  }
}

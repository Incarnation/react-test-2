import React from "react";
import * as actions from "actions";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import { toast } from "react-toastify";

//file upload component
export class BwmFileUpload extends React.Component {
  constructor(props) {
    super(props);

    //initilizae a file reader
    this.setupReader();

    //initial state
    this.state = {
      initImageBase64: "",
      selectedFile: undefined,
      imageBase64: "",
      pending: false,
      status: "INIT",
      crop: {},
      croppedImage: {}
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
      const { initImageBase64 } = this.state;
      const imageBase64 = event.target.result;

      if (initImageBase64) {
        this.setState({ imageBase64: imageBase64 });
      } else {
        //if an picture is selected
        //this.reader.readAsDataURL(selectedFile) will be called
        //and this.reader.addEventListener will triggered
        //check the initial base64 value, if there is none
        //update the state
        this.setState({
          imageBase64: imageBase64,
          initImageBase64: imageBase64
        });
      }
    });
  }

  //this function is called when user select an file
  //on the UI
  onChange(event) {
    //get the first file from event target
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.setState({ selectedFile: selectedFile, initImageBase64: "" });

      //the reader will read our file we just selected
      //will transform the file to base64
      //will fire the event 'load'
      this.reader.readAsDataURL(selectedFile);
    }
  }

  //Croping image functionality ------------------------------------------------
  //refer to: https://github.com/DominicTobias/react-image-crop
  //crop compoent
  onCropChange(crop) {
    this.setState({ crop });
  }

  onImageLoaded(image) {
    //check the Minimun size of the image
    if (image.naturalWidth < 950 && image.naturalHeight < 720) {
      this.setState({
        pending: false,
        status: "INIT",
        selectedFile: {},
        croppedImage: {},
        initImageBase64: "",
        imageBase64: ""
      });
      toast.error("Minimun width of image is 950px and height is 720px");
      debugger;
      return;
    }

    this.setState({
      crop: makeAspectCrop(
        {
          x: 0,
          y: 0,
          aspect: 4 / 3,
          width: 50
        },
        image.width / image.height
      )
    });
  }

  //get the image after cropping
  async onCropCompleted(crop, pixelCrop) {
    //debugger;
    const { selectedFile, initImageBase64 } = this.state;
    if (selectedFile && (pixelCrop.height > 0 && pixelCrop.width > 0)) {
      const img = new Image();
      img.src = initImageBase64;
      const croppedImage = await getCroppedImg(
        img,
        pixelCrop,
        selectedFile.name
      );
      this.setState({ croppedImage: croppedImage });
      this.setupReader();
      this.reader.readAsDataURL(croppedImage);
    }
  }
  //Croping image functionality ------------------------------------------------
  //----------------------------------------------------------------------------

  //call action uploadImage when user click uploadimage button
  uploadImage() {
    const { croppedImage } = this.state;

    if (croppedImage) {
      //update state when file selected
      this.setState({ pending: true, status: "INIT" });

      //call action defined in actions folder index file
      actions.uploadImage(croppedImage).then(
        image => {
          //debugger;
          this.onSuccess(image);
        },
        err => {
          //debugger;
          this.onError(err);
        }
      );
    }
  }

  onError(error) {
    //update state when file upload failed
    this.setState({ pending: false, status: "FAIL" });
  }

  //GET the response Image URL and pass to the onChange function
  onSuccess(image) {
    const { onChange } = this.props.input || this.props;
    //update state when file uploaded
    this.setState({
      pending: false,
      status: "OK",
      selectedFile: {},
      croppedImage: {},
      initImageBase64: "",
      imageBase64: ""
    });

    onChange(image);
  }

  //spining circle while the image is uploading
  renderSpinningCircle() {
    const { pending } = this.state;

    if (pending) {
      return (
        <div className="img-loading-overlay">
          <div className="img-spinning-circle" />
        </div>
      );
    }
  }

  //display image upload status
  renderImageStatus() {
    const { status } = this.state;

    if (status === "OK") {
      return (
        <div className="alert alert-success">Image Upload Successfully</div>
      );
    }

    if (status === "FAIL") {
      return <div className="alert alert-danger">Image Upload Failed</div>;
    }
  }

  render() {
    const {
      label,
      meta: { touched, error }
    } = this.props;
    const { selectedFile, imageBase64, crop, initImageBase64 } = this.state;

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

        {/*
          Upload image button
          trigger uploadImage function when click
          button would be disable if there is no file selected
          */}

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

        {/*
            ReactCrop component for image croping
            //refer to https://github.com/DominicTobias/react-image-crop
               */}
        {initImageBase64 && (
          <ReactCrop
            src={initImageBase64}
            crop={crop}
            onChange={crop => this.onCropChange(crop)}
            onImageLoaded={image => this.onImageLoaded(image)}
            onComplete={(crop, pixelCrop) => {
              this.onCropCompleted(crop, pixelCrop);
            }}
          />
        )}

        {/*
            Error message displayed
            */}
        {touched &&
          (error && <div className="alert alert-danger">{error}</div>)}

        {/*
            Image container which would display the select image
            */}

        {imageBase64 && (
          <div className="img-preview-container">
            <div
              className="img-preview"
              style={{ backgroundImage: "url(" + imageBase64 + ")" }}
            />
            {this.renderSpinningCircle()}
          </div>
        )}
        {this.renderImageStatus()}
      </div>
    );
  }
}

//refer to
// https://github.com/DominicTobias/react-image-crop
function getCroppedImg(image, pixelCrop, fileName) {
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      blob.name = fileName;
      resolve(blob);
    }, "image/jpeg");
  });
}

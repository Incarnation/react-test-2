import React from "react";

//file upload component
class BwmFileUpload extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{label}</label>
        <div className="input-group">
          {symbol && (
            <div className="input-group-prepend">
              <div className="input-group-text">{symbol}</div>
            </div>
          )}
          <input {...input} type={type} className={className} />
        </div>
        {touched &&
          (error && <div className="alert alert-danger">{error}</div>)}
      </div>
    );
  }
}

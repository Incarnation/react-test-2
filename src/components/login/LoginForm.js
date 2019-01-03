//imports
import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "components/shared/form/BwmInput";
import { BwmResError } from "components/shared/form/BwmResError";
import { required, minLength4 } from "components/shared/form/validators";

//login component
const LoginForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    submitCallBack,
    valid,
    errors
  } = props;

  //return jsx for loginform component
  return (
    <form onSubmit={handleSubmit(submitCallBack)}>
      <Field
        name="email"
        type="email"
        label="Email"
        className="form-control"
        component={BwmInput}
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        type="password"
        label="Password"
        className="form-control"
        component={BwmInput}
        validate={[required]}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Login
      </button>
    </form>
  );
};

export default reduxForm({
  form: "loginForm"
})(LoginForm);
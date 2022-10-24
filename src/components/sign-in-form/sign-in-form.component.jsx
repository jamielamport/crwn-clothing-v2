import { useState } from "react";

import {
  signInWithGooglepPopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../routes/utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "../sign-up-form/sign-up-form.styles.scss";

const signInWithGoogle = async () => {
  const { user } = await signInWithGooglepPopup();
  await createUserDocumentFromAuth(user);
};

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Your password is incorrect, please try again");
          break;
        case "auth/user-not-found":
          alert(
            "This email does not exist, please sign up or connect via google"
          );
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          onChange={handleChange}
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign in with Google Popup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

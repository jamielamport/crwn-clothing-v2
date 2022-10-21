import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglepPopup,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglepPopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}> Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;

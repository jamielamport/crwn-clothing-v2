import {
  signInWithGooglepPopup,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglepPopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}> Sign in with Google POpup</button>
    </div>
  );
};

export default SignIn;

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./Firebase";

export const auth = getAuth(app);

export const createAccountHandler = async (userEmail, userPassword) => {
  try {
    const data = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    return data.user.uid;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};
export const loginHandler = async (userEmail, userPassword) => {
  try {
    const data = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    return data.user.uid;
  } catch (error) {
    console.log(error);
  }
};
const logoutHandler = async() =>{
try{
    await signOut(auth);
    return true;
}
catch(error){
    console.log(error);
}
}
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC3XoEDtr0133Kn_nJPYUG8PJIpmvv4Xcw",
//   authDomain: "todo-5335a.firebaseapp.com",
//   projectId: "todo-5335a",
//   storageBucket: "todo-5335a.appspot.com",
//   messagingSenderId: "491316189919",
//   appId: "1:491316189919:web:9024428608a9ab0e6fa76a",
//   measurementId: "G-M4HFTTTNYM",
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
//   auth.signInWithPopup(googleProvider);
// };

// export const generateUserDocument = async (userAuth, additionalData) => {
//   if (!userAuth) {
//     return null;
//   }

//   const userRef = firestore.doc(`users/${userAuth.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists()) {
//     const { email, displayName, photoURL } = userAuth;
//     try {
//       await userRef.set({
//         displayName,
//         email,
//         photoURL,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.error("Error creating user", error);
//     }
//   }
//   return getUserDocument(userAuth.uid);
// };

// const getUserDocument = async (uid) => {
//   if (!uid) {
//     return null;
//   }
//   try {
//     const userDocument = await firestore.doc(`users/${uid}`).get();

//     return {
//       uid,
//       ...userDocument.data(),
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };

// export default firebase;

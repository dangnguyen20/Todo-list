// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginFail, loginSuccess } from "../Reducer/reducer";
// import { signInWithEmailAndPassword } from "firebase/auth";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [user, loading, error] = useAuthState(auth);
//   // const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(email, password);
//       dispatch(loginSuccess());
//     } catch (err) {
//       console.error(err);
//       dispatch(loginFail(err.message));
//     }
//   };
//   return (
//     <div className="login">
//       <div className="login__container" onChange={handleLogin}>
//         <input
//           type="text"
//           className="login__textBox"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="E-mail Address"
//         />
//         <input
//           type="password"
//           className="login__textBox"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button
//           className="login__btn"
//           onClick={() => signInWithEmailAndPassword(email, password)}
//         >
//           Login
//         </button>
//         {/* <button className="login__btn login__google" onClick={signInWithGoogle}>
//           Login with Google
//         </button>
//         <div>
//           <Link to="/">Forgot Password</Link>
//         </div>
//         <div>
//           Don't have an account? <Link to="/">Register</Link> now.
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserProvider, { UserContext } from "../Utils/UserProvider";
import Application from "./Application";
import SignIn from "../Authentication/signIn";
import { useEffect } from "react";
import { auth, generateUserDocument } from "../Utils/firebase";
// import { useDispatch } from "react-redux";

const Login = () => {
  const user = useContext(UserContext);
  // const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      await generateUserDocument(userAuth);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserProvider>
      <Router>
        {user ? (
          <Route exact path="/" Component={Application} />
        ) : (
          <Route exact path="/" Component={SignIn} />
        )}
      </Router>
    </UserProvider>
  );
};

export default Login;

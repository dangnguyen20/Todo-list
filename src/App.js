import React from "react";
import Header from "./Components/Header";
import Forms from "./Components/Forms";
import List from "./Components/List";
// import { useSelector } from "react-redux";
// import Login from "./Components/Login";
// import SignIn from "./Components/Authentication/signIn";
// import UserProvider from "./Utils/UserProvider";

const App = () => {
  // const user = useSelector((state) => state.initialState.user);
  return (
    <div className="container">
      <Header />
      <Forms />
      <List />
    </div>
  );
};

export default App;

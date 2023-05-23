import React from "react";
import Header from "./Components/Header";
import Forms from "./Components/Forms";
import List from "./Components/List";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Forms />
      <List/>
      <Footer />
    </div>
  );
};

export default App;

import React, { useState } from "react";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import AppRoutes from "./routes";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // Track login state

  return (
    <>
      <NavbarComponent />
      <div className="app-container">
        <AppRoutes loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </div>
      <Footer />
    </>
  );
};

export default App;

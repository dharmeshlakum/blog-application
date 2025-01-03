import React from "react";
import Navigation from "./navigation/Navigation";
import AlertProviders from "./contexts/alert/AlertProviders";

const App: React.FC = () => {

  return (
    <>
      <AlertProviders>
        <Navigation />
      </AlertProviders>
    </>
  );
}

export default App;
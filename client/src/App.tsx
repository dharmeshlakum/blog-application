import React from "react";
import Navigation from "./navigation/Navigation";
import AlertProviders from "./contexts/alert/AlertProviders";
import AuthProviders from "./contexts/auth/AuthProviders";

const App: React.FC = () => {

  return (
    <>
      <AlertProviders>
        <AuthProviders>
        <Navigation />
        </AuthProviders>
      </AlertProviders>
    </>
  );
}

export default App;
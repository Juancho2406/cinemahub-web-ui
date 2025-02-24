import React from "react";
import { AppProvider } from "./hooks/context";
import { CinemaHubComponent } from "./pages/cinemahub.pages";
import './styles/styles.scss'
const App: React.FC = () => {
  
  return (
    <AppProvider>
      <CinemaHubComponent />
    </AppProvider>
  );
};

export default App;

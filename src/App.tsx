import React from "react";
import { AppProvider } from "./hooks/context";
import { CinemaHubComponent } from "./pages/cinemahub.pages";
const App: React.FC = () => {
  
  return (
    <AppProvider>
      <CinemaHubComponent />
    </AppProvider>
  );
};

export default App;

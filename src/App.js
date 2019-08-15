import React from 'react';
import './App.css';
import DeskProvider from "./components/DeskProvider";
import Desk from "./components/Desk";

const App = () => (
  <DeskProvider>
     <Desk />
  </DeskProvider>
  );

export default App;

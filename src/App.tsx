import React from "react";
import NoteTable from "./components/NoteTable";
import NoteSummary from "./components/NoteSummary";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Замітки</h1>
      <NoteTable />
      <NoteSummary />
    </div>
  );
};

export default App;

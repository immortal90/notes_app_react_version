import React from "react";
import NoteTable from "./components/NoteTable";
import NoteSummary from "./components/NoteSummary";
import "tailwindcss/tailwind.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="bg-lime-100 font-serif">
      <h1>Замітки</h1>
      <NoteTable />
      <NoteSummary />
    </div>
  );
};

export default App;

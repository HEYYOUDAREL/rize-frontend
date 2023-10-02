import React, { useState } from "react";
import "./App.css";
import { AppNavbar } from "./components/AppNavbar";
import { Counter } from "./components/Counter";
import { SubCounter } from "./components/SubCounter";
import { TableComponent } from "./components/TableComponent";

function App() {

  return (
    <div>
      <AppNavbar />
      <div className="App">
        <div className="left">
          <TableComponent />
        </div>
        <div className="right">
          <div className="top">
            <SubCounter />
          </div>
          <div className="bottom">
            <Counter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
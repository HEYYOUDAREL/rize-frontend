import React, { useState } from "react";
import { AppNavbar } from "../components/AppNavbar";
import { Counter } from "../components/Counter";
import { SubCounter } from "../components/SubCounter";
import { Table } from "../components/Table";

function App() {

  return (
    <div>
      <AppNavbar />
      <div className="App">
        <div className="left">
          <Table />
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
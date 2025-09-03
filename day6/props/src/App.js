import React from "react";
import UserCard from "./Components/Usercard";

function App() {
  return (
    <div className="App">
      <h1>User Cards</h1>
      <UserCard name="Alice" age={24} email="alice@mail.com" />
      <UserCard name="Bob" age={28} email="bob@mail.com" />
      <UserCard name="Charlie" age={30} email="charlie@mail.com" />
    </div>
  );
}

export default App;

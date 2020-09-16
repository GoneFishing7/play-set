import React, { useEffect, useState } from "react";
import Game from "./ui/Game";
import "./App.scss";
import DarkModeToggle from "react-dark-mode-toggle";

function App() {
  const [isDark, toggleDark] = useState(() =>
    localStorage.getItem("isDark")
      ? localStorage.getItem("isDark") === "true"
      : false
  );
  useEffect(() => {
    localStorage.setItem("isDark", String(isDark));
  });
  return (
    <div id="app" className={isDark ? "dark" : "light"}>
      <Game />
      <div className="dark-mode-toggle-wrapper">
        <DarkModeToggle checked={isDark} onChange={toggleDark} />
      </div>
    </div>
  );
}

export default App;
